'use client';

const COMPANIES = [
  { name: 'Google', logo: 'https://ui-avatars.com/api/?name=G&background=4285F4&color=fff&size=48' },
  { name: 'Microsoft', logo: 'https://ui-avatars.com/api/?name=MS&background=00A4EF&color=fff&size=48' },
  { name: 'Apple', logo: 'https://ui-avatars.com/api/?name=AP&background=555555&color=fff&size=48' },
  { name: 'Amazon', logo: 'https://ui-avatars.com/api/?name=AZ&background=FF9900&color=fff&size=48' },
  { name: 'Meta', logo: 'https://ui-avatars.com/api/?name=MT&background=0668E1&color=fff&size=48' },
  { name: 'Netflix', logo: 'https://ui-avatars.com/api/?name=NF&background=E50914&color=fff&size=48' },
  { name: 'Stripe', logo: 'https://ui-avatars.com/api/?name=ST&background=6772E5&color=fff&size=48' },
  { name: 'Airbnb', logo: 'https://ui-avatars.com/api/?name=AB&background=FF5A5F&color=fff&size=48' },
  { name: 'Shopify', logo: 'https://ui-avatars.com/api/?name=SH&background=96BF48&color=fff&size=48' },
  { name: 'Figma', logo: 'https://ui-avatars.com/api/?name=FG&background=F24E1E&color=fff&size=48' },
];

export default function CompaniesSection() {
  return (
    <section className="py-16 bg-slate-900/50 overflow-hidden">
      <div className="section-container mb-8">
        <p className="text-center text-white/40 text-sm font-medium uppercase tracking-widest">
          Trusted by professionals at world-class companies
        </p>
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative">
        <div className="flex gap-8 animate-[marquee_20s_linear_infinite]">
          {[...COMPANIES, ...COMPANIES].map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 glass-card border-white/5 rounded-xl shrink-0 hover:border-white/15 transition-all duration-300"
            >
              <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-lg" />
              <span className="text-white/60 font-medium text-sm whitespace-nowrap">{company.name}</span>
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
