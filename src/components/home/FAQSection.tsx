'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'How does the AI Career Coach work?',
    answer: 'The AI Career Coach uses advanced large language models (LLMs) trained on career counseling, interview prep, and salary negotiation strategies. It provides real-time, context-aware advice based on your conversations and profile.',
  },
  {
    question: 'Is CareerLens AI free to use?',
    answer: 'Yes, searching and applying for jobs is free. Basic AI generation (like generating a few cover letters per month) is also free. We offer premium plans for unlimited AI coaching and content generation.',
  },
  {
    question: 'How accurate is the Smart Match Score?',
    answer: "Our match score analyzes your skills, experience, and preferences against the job requirements. It typically has a 95% accuracy rate in indicating whether you'll be a strong candidate.",
  },
  {
    question: 'Can I post jobs as an employer?',
    answer: 'Absolutely! Create an account, head to the "Post Job" page, and fill out the details. Our AI will automatically suggest tags to improve your listing visibility.',
  },
  {
    question: 'How do I generate a cover letter?',
    answer: 'Navigate to the AI Generator page, select "Cover Letter", enter your target job title, target company, key skills, and experience level, then click generate. You can regenerate the response with different tones (professional, creative, confident, etc.).',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-900/50" id="faq">
      <div className="section-container">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-white/50">Got questions? We've got answers.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden border border-white/5 transition-colors duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-white hover:bg-white/5 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-white/50 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-sm text-white/60 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
