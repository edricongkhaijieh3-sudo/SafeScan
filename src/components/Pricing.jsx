import { ScrollReveal } from './ScrollReveal'

const PLANS = [
  {
    name: 'Free',
    price: 'RM 0',
    period: '/mo',
    features: ['5 scans/day', 'Basic verdict', 'QR + URL only'],
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 'RM 22',
    period: '/mo',
    features: ['Unlimited scans', 'Detailed reports', 'Files up to 50MB', 'Scan history'],
    highlighted: true,
  },
  {
    name: 'Family',
    price: 'RM 45',
    period: '/mo',
    features: ['Everything in Premium', 'Up to 5 family members', 'Elderly parent mode', 'Weekly threat summary'],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span className="text-[#00c4ff] text-sm font-semibold tracking-wider uppercase">Pricing — Tell Us What Feels Right</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-6">
            Simple, honest pricing. We're still deciding — your input matters.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className={`p-8 rounded-2xl border ${
                  plan.highlighted ? 'bg-[#00ff87]/5 border-[#00ff87]/40' : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-heading font-bold text-xl text-white">{plan.name}</h3>
                  {plan.highlighted && <span className="text-xs text-[#00ff87]">⭐</span>}
                </div>
                <div className="mb-6">
                  <span className="font-heading font-bold text-3xl text-white">{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="text-[#00ff87]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="mt-12 p-6 rounded-2xl bg-[#00c4ff]/10 border border-[#00c4ff]/30">
            <p className="text-white/90">
              <span className="text-[#00c4ff]">💡</span> These are our working assumptions. After submitting the survey above, tell us which plan you'd actually pay for — it directly influences what we launch with.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
