/**
 * The page's questions and answers as schema.org FAQPage data, so search engines and AI
 * crawlers can read them as questions. It is data, not a script: nothing runs.
 */
export default function FaqSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };
  // "<" is escaped so no answer text can ever close the tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
