import { useEffect, useRef, type RefObject } from "react";

// A procedural spider that crawls the cards inside `areaRef`: it walks to each
// [data-crawl-target], "reads" it for a moment, then moves on. With a mouse in
// the area it chases the cursor instead. Legs use two-bone IK and step in two
// alternating groups, so the gait looks like a real spider.

type Vec = { x: number; y: number };

const ink = "#f4f1ea";
const signal = "#ff5a1f";

// Body-frame offsets (x forward, y to the right). Left legs mirror y.
const hips: Vec[] = [
  { x: 7, y: 5 },
  { x: 3, y: 7 },
  { x: -2, y: 7 },
  { x: -6, y: 5 },
];
const rest: Vec[] = [
  { x: 36, y: 30 },
  { x: 14, y: 44 },
  { x: -10, y: 44 },
  { x: -32, y: 32 },
];
const upper = 24;
const lower = 27;
const stepDistance = 20;
const stepSeconds = 0.11;
const readSeconds = 1.5;

type Leg = {
  foot: Vec;
  from: Vec;
  group: 0 | 1;
  hip: Vec;
  rest: Vec;
  side: 1 | -1;
  stepping: number; // 0 when planted, otherwise step progress 0..1
  to: Vec;
};

function rotate(v: Vec, angle: number): Vec {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}

function createLegs(): Leg[] {
  return ([1, -1] as const).flatMap((side) =>
    hips.map((hip, index) => ({
      foot: { x: 0, y: 0 },
      from: { x: 0, y: 0 },
      // Tetrapod gait: R0 L1 R2 L3 step together, then L0 R1 L2 R3.
      group: ((index + (side === 1 ? 0 : 1)) % 2) as 0 | 1,
      hip: { x: hip.x, y: hip.y * side },
      rest: { x: rest[index]!.x, y: rest[index]!.y * side },
      side,
      stepping: 0,
      to: { x: 0, y: 0 },
    })),
  );
}

function knee(hip: Vec, foot: Vec, body: Vec, scale: number): Vec {
  const a = upper * scale;
  const b = lower * scale;
  const dx = foot.x - hip.x;
  const dy = foot.y - hip.y;
  const distance = Math.min(a + b - 0.5, Math.max(Math.abs(a - b) + 0.5, Math.hypot(dx, dy)));
  const base = Math.atan2(dy, dx);
  const bend = Math.acos((a * a + distance * distance - b * b) / (2 * a * distance));
  // Of the two possible knees, use the one farther from the body, so each leg
  // arches outward the way a real spider's does.
  const [first, second] = [base + bend, base - bend].map((angle) => ({
    x: hip.x + Math.cos(angle) * a,
    y: hip.y + Math.sin(angle) * a,
  }));
  return Math.hypot(first!.x - body.x, first!.y - body.y) >= Math.hypot(second!.x - body.x, second!.y - body.y)
    ? first!
    : second!;
}

export default function CrawlerSpider({ areaRef }: { areaRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const area = areaRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !area || !context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scale = window.matchMedia("(min-width: 640px)").matches ? 1.3 : 0.8;
    const legs = createLegs();
    const position: Vec = { x: -60, y: 40 };
    const velocity: Vec = { x: 0, y: 0 };
    let heading = 0;
    let width = 0;
    let height = 0;
    let targets: HTMLElement[] = [];
    let targetIndex = 0;
    let readTimer = 0;
    let reading: HTMLElement | null = null;
    let pointer: Vec | null = null;
    let visible = false;
    let frame = 0;
    let last = 0;

    const toWorld = (offset: Vec) => {
      const turned = rotate({ x: offset.x * scale, y: offset.y * scale }, heading);
      return { x: position.x + turned.x, y: position.y + turned.y };
    };
    legs.forEach((leg) => {
      leg.foot = toWorld(leg.rest);
    });

    const resize = () => {
      const box = area.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      targets = Array.from(area.querySelectorAll<HTMLElement>("[data-crawl-target]"));
    };

    // Each card is read from just under its top edge, where the logo sits.
    const cardPoint = (card: HTMLElement): Vec => {
      const box = card.getBoundingClientRect();
      const origin = area.getBoundingClientRect();
      return { x: box.left - origin.left + box.width * 0.5, y: box.top - origin.top + 70 * scale };
    };

    const setReading = (card: HTMLElement | null) => {
      if (reading && reading !== card) reading.dataset.crawled = "done";
      reading = card;
      if (card) card.dataset.crawled = "active";
    };

    const step = (dt: number) => {
      // Pick the goal: the cursor when there is one, otherwise the next card.
      let goal: Vec | null = null;
      let stopDistance = 6;
      if (pointer) {
        goal = pointer;
        stopDistance = 46 * scale;
        if (reading) setReading(null);
      } else if (targets.length) {
        const card = targets[targetIndex % targets.length]!;
        goal = cardPoint(card);
        if (Math.hypot(goal.x - position.x, goal.y - position.y) < 10) {
          if (reading !== card) {
            setReading(card);
            readTimer = readSeconds;
          }
          readTimer -= dt;
          if (readTimer <= 0) {
            targetIndex += 1;
            if (targetIndex % targets.length === 0) targets.forEach((target) => delete target.dataset.crawled);
          }
        }
      }

      // Steer: accelerate toward the goal, ease off on arrival, turn smoothly.
      const maxSpeed = 150 * scale;
      let desired: Vec = { x: 0, y: 0 };
      if (goal) {
        const dx = goal.x - position.x;
        const dy = goal.y - position.y;
        const distance = Math.hypot(dx, dy);
        if (distance > stopDistance) {
          const speed = Math.min(maxSpeed, (distance - stopDistance) * 2.4);
          desired = { x: (dx / distance) * speed, y: (dy / distance) * speed };
        }
      }
      const blend = 1 - Math.exp(-6 * dt);
      velocity.x += (desired.x - velocity.x) * blend;
      velocity.y += (desired.y - velocity.y) * blend;
      position.x += velocity.x * dt;
      position.y += velocity.y * dt;
      const speed = Math.hypot(velocity.x, velocity.y);
      if (speed > 8) {
        let turn = Math.atan2(velocity.y, velocity.x) - heading;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn));
        heading += turn * (1 - Math.exp(-8 * dt));
      } else if (goal && pointer) {
        // Standing still near the cursor: keep facing it.
        let turn = Math.atan2(goal.y - position.y, goal.x - position.x) - heading;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn));
        heading += turn * (1 - Math.exp(-5 * dt));
      }

      // Legs: plant feet, and step when a foot falls too far behind its rest spot.
      const lead = { x: velocity.x * 0.12, y: velocity.y * 0.12 };
      const busy = [0, 1].map((group) => legs.some((leg) => leg.group === group && leg.stepping > 0));
      for (const leg of legs) {
        const ideal = toWorld(leg.rest);
        ideal.x += lead.x;
        ideal.y += lead.y;
        if (leg.stepping > 0) {
          leg.stepping = Math.min(1, leg.stepping + dt / stepSeconds);
          const t = leg.stepping;
          const eased = t * t * (3 - 2 * t);
          leg.foot = { x: leg.from.x + (leg.to.x - leg.from.x) * eased, y: leg.from.y + (leg.to.y - leg.from.y) * eased };
          if (t >= 1) leg.stepping = 0;
        } else if (
          Math.hypot(ideal.x - leg.foot.x, ideal.y - leg.foot.y) > stepDistance * scale &&
          !busy[1 - leg.group]
        ) {
          leg.from = { ...leg.foot };
          leg.to = ideal;
          leg.stepping = 0.0001;
        }
      }
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      context.lineCap = "round";
      context.lineJoin = "round";

      // Reading beam: a small orange pulse while the spider reads a card.
      if (reading) {
        const pulse = (now / 600) % 1;
        context.strokeStyle = signal;
        context.globalAlpha = 1 - pulse;
        context.lineWidth = 1.5;
        context.beginPath();
        context.arc(position.x, position.y, (18 + pulse * 40) * scale, 0, Math.PI * 2);
        context.stroke();
        context.globalAlpha = 1;
      }

      context.strokeStyle = ink;
      for (const leg of legs) {
        const hip = toWorld(leg.hip);
        const joint = knee(hip, leg.foot, position, scale);
        const lift = leg.stepping > 0 ? Math.sin(leg.stepping * Math.PI) : 0;
        context.lineWidth = 2.4 * scale;
        context.beginPath();
        context.moveTo(hip.x, hip.y);
        // Lifted legs draw their knee a touch higher, which reads as a step.
        context.lineTo(joint.x, joint.y - lift * 6 * scale);
        context.lineWidth = 1.8 * scale;
        context.lineTo(leg.foot.x, leg.foot.y);
        context.stroke();
      }

      // Body: abdomen behind, head in front, an orange mark on the back.
      const abdomen = toWorld({ x: -15, y: 0 });
      const head = toWorld({ x: 9, y: 0 });
      context.fillStyle = ink;
      context.beginPath();
      context.ellipse(abdomen.x, abdomen.y, 16 * scale, 12 * scale, heading, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.arc(position.x, position.y, 8.5 * scale, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.arc(head.x, head.y, 5.5 * scale, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = signal;
      context.beginPath();
      context.arc(abdomen.x, abdomen.y, 5 * scale, 0, Math.PI * 2);
      context.fill();
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      step(dt);
      draw(now);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
      if (!frame) last = 0;
    };
    const resume = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = area.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      pointer = x >= 0 && y >= 0 && x <= box.width && y <= box.height ? { x, y } : null;
    };
    const onLeave = () => {
      pointer = null;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(area);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      resume();
    });
    intersection.observe(area);
    const onVisibility = () => resume();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      targets.forEach((target) => delete target.dataset.crawled);
    };
  }, [areaRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10" />;
}
