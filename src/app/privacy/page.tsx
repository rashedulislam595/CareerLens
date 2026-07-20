export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-container max-w-3xl">
        <div className="glass-card p-6 sm:p-8 border border-white/5 space-y-6">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy & Terms</h1>
          <p className="text-white/40 text-xs">Last updated: July 19, 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Data Collection</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              CareerLens AI collects your profile details, including name, email, biography, and professional experiences to match you with job openings. We utilize LLM APIs (Gemini/Groq) to generate profile recommendations, covering letter materials, and chat answers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. AI Usage Policies</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              When utilizing our AI generator or career coach, prompt data might be processed by external language model providers to generate response completions. Your password details are never shared with AI models.
            </p>
          </section>

          <section className="space-y-3" id="terms">
            <h2 className="text-xl font-bold text-white">3. Terms of Service</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Users must refrain from publishing spam, illegitimate postings, or duplicate job entries. We reserve rights to moderate, edit, or remove listings violating standard service terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
