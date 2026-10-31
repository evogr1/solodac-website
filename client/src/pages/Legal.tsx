import type { ReactNode } from "react";
import Layout from "@/components/Layout";
import { Kicker } from "@/components/site";
import { company } from "@/lib/site";

const updated = "28 October 2026";

const mail = <a href={`mailto:${company.email}`}>{company.email}</a>;

const docs: Record<"privacy" | "terms" | "refunds", { title: string; body: ReactNode }> = {
  privacy: {
    title: "Privacy policy",
    body: (
      <>
        <p>This policy explains what personal information {company.tradeName} ("SoloDac", "we", "us") collects through solodac.com and our products, including Katran, and what we do with it. SoloDac is a proprietorship owned by {company.proprietor}, registered under GSTIN {company.gstin} in Indore, Madhya Pradesh.</p>
        <h2>What we collect</h2>
        <ul>
          <li>Details you give us in forms: your name, email, phone number, brand or channel, budget and message.</li>
          <li>Waitlist details for Katran: what you make, how much you post and a link to your channel or page.</li>
          <li>Files you upload to Katran once you have access. These include voiceovers, videos and images.</li>
          <li>Basic technical data like browser type and pages visited, collected by our hosting provider to keep the site running.</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiry and to provide the services you hire us for.</li>
          <li>To tell you when Katran access opens and to run your account.</li>
          <li>To send invoices and meet our tax and legal obligations.</li>
        </ul>
        <p>We do not sell your personal information. We do not use your uploads to train models for anyone else.</p>
        <h2>Who we share it with</h2>
        <p>We use a small number of service providers to run the site and our products. These include form handling, hosting, cloud storage and payment processing. They only get what they need to do their job. We may also share information when the law requires it.</p>
        <h2>How long we keep it</h2>
        <p>Enquiries and waitlist details are kept for as long as they are useful to answer you or give you access. Files uploaded to Katran are deleted automatically within a few days of processing. Invoices and billing records are kept for as long as Indian tax law requires.</p>
        <h2>Your choices</h2>
        <p>You can ask us to show, correct or delete the personal information we hold about you at any time by emailing {mail}. You can unsubscribe from our emails using the link in any email.</p>
        <h2>Contact</h2>
        <p>Questions about this policy go to {mail}.</p>
      </>
    ),
  },
  terms: {
    title: "Terms of service",
    body: (
      <>
        <p>These terms apply when you use solodac.com, hire SoloDac for services or use Katran. {company.tradeName} is a proprietorship owned by {company.proprietor}, GSTIN {company.gstin}. By using the site or our services you agree to these terms.</p>
        <h2>Services</h2>
        <p>The scope, deliverables, timelines and fees for client work are set out in a written proposal or agreement for each project. If that document and these terms disagree, the project document wins.</p>
        <h2>Fees and invoices</h2>
        <p>Fees are in Indian rupees unless agreed otherwise and are charged with GST as applicable. Invoices are due on the date shown on them. We may pause work on overdue accounts.</p>
        <h2>Your content</h2>
        <p>You keep ownership of the material you send us. You confirm you have the right to use it, and you allow us to use it to deliver the work. Once an invoice is paid in full, the final deliverables made for you belong to you. We may show finished work in our portfolio unless you ask us not to in writing.</p>
        <h2>Katran</h2>
        <ul>
          <li>Access is personal to your account. Don't share logins or resell access.</li>
          <li>Only upload content you own or have permission to use. You are responsible for what you publish.</li>
          <li>Don't use Katran for anything illegal, misleading, hateful or infringing.</li>
          <li>The product is under active development. Features may change, and we may suspend accounts that break these terms.</li>
        </ul>
        <h2>Our liability</h2>
        <p>We do our work with care. We can't promise specific views, followers, revenue or platform decisions, because platforms control those. To the extent the law allows, our total liability for any claim is limited to the fees you paid us in the three months before the claim.</p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India. Courts in Indore, Madhya Pradesh have jurisdiction over any dispute.</p>
        <h2>Contact</h2>
        <p>Questions about these terms go to {mail}.</p>
      </>
    ),
  },
  refunds: {
    title: "Refunds and cancellation",
    body: (
      <>
        <p>This policy covers payments made to {company.tradeName} (GSTIN {company.gstin}) for services and for Katran.</p>
        <h2>Client services</h2>
        <ul>
          <li>Monthly retainers can be cancelled with 30 days' written notice to {mail}.</li>
          <li>Work already delivered or in production when you cancel is billable.</li>
          <li>Advance payments for work that has not started are refunded, less any third-party costs we have already paid on your behalf.</li>
          <li>One-off projects follow the payment terms in the project proposal.</li>
        </ul>
        <h2>Katran subscriptions</h2>
        <ul>
          <li>You can cancel at any time from your account or by emailing us. Your plan stays active until the end of the period you paid for.</li>
          <li>If you are charged by mistake or can't use the product because of a fault on our side, email us within 7 days and we will refund that charge.</li>
          <li>Usage already consumed in a billing period is not refundable.</li>
        </ul>
        <h2>How refunds are paid</h2>
        <p>Approved refunds go back to the original payment method within 7 to 10 working days. GST is refunded or adjusted as the law allows.</p>
        <h2>Contact</h2>
        <p>Refund and cancellation requests go to {mail} with your invoice number.</p>
      </>
    ),
  },
};

export default function Legal({ doc }: { doc: keyof typeof docs }) {
  const { title, body } = docs[doc];

  return (
    <Layout>
      <section className="container pb-24 pt-32 sm:pt-44">
        <div className="mx-auto max-w-3xl">
          <Kicker>Legal</Kicker>
          <h1 className="font-display mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">{title}</h1>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/40">Last updated {updated}</div>
          <div className="prose-legal mt-10">{body}</div>
        </div>
      </section>
    </Layout>
  );
}
