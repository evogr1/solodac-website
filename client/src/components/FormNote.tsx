import { Link } from "wouter";

/** What we do with the details, under every form. */
export default function FormNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[14px] leading-relaxed text-paper/60 ${className}`}>
      We only use this to reply about Katran or your enquiry. No spam. See our{" "}
      <Link href="/privacy" className="underline decoration-paper/30 underline-offset-4 hover:text-paper hover:decoration-signal">Privacy policy</Link>.
    </p>
  );
}
