import Reveal from "@/components/Reveal";

const roles = [
  { job: "Scripts", who: "A writer" },
  { job: "Editing", who: "An editor" },
  { job: "Design", who: "A designer" },
  { job: "Posting", who: "A social media manager" },
  { job: "Reports", who: "An analyst" },
];

/** The five jobs a page needs, each with the hire it would usually take. One quiet row, no boxes. */
export default function FiveHires() {
  return (
    <ol className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
      {roles.map((role, index) => (
        <li key={role.job}>
          <Reveal delay={index * 0.06} y={16}>
            <span className="font-display block text-[clamp(26px,2.4vw,36px)] leading-none tracking-[-0.02em]">{role.job}</span>
            <span className="mt-3 block text-[15px] text-paper/55">{role.who}</span>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
