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
          <span className="text-[#0052CC] text-sm font-semibold tracking-wider uppercase">Pricing — Tell Us What Feels Right</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] mt-4 mb-6">
            Simple, honest pricing. We're still deciding — your input matters.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className={`p-8 rounded-2xl border ${
                  plan.highlighted ? 'bg-[#0052CC]/5 border-[#0052CC]/40' : 'bg-[#F4F5F7] border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-heading font-bold text-xl text-[#0A0A0A]">{plan.name}</h3>
                  {plan.highlighted && <span className="text-xs text-[#0052CC]">⭐</span>}
                </div>
                <div className="mb-6">
                  <span className="font-heading font-bold text-3xl text-[#0A0A0A]">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="text-[#00875A]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="mt-12 p-6 rounded-2xl bg-[#0052CC]/5 border border-[#0052CC]/20">
            <p className="text-[#0A0A0A]/90">
              <span className="text-[#0052CC]">💡</span> These are our working assumptions. After submitting the survey above, tell us which plan you'd actually pay for — it directly influences what we launch with.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
