import Layout from "@/components/Layout";
import { GhostButton, Kicker, PrimaryButton } from "@/components/site";

export default function NotFound() {
  return (
    <Layout>
      <section className="container flex min-h-[80vh] flex-col justify-center pb-24 pt-32">
        <Kicker>404</Kicker>
        <h1 className="font-display mt-6 text-[clamp(3rem,9vw,7rem)] leading-[0.9]">This page didn't make the cut.</h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <PrimaryButton href="/">Back home</PrimaryButton>
          <GhostButton href="/contact">Contact us</GhostButton>
        </div>
      </section>
    </Layout>
  );
}
