import { ScrollReveal } from './ScrollReveal'

const STATS = [
  { value: 'RM 1.2B', label: 'Lost to scams in Malaysia 2023' },
  { value: '66,000', label: 'Scam cases reported to PDRM 2023' },
  { value: '1 in 3', label: 'Malaysians personally know a scam victim' },
  { value: '#1', label: 'Maybank most impersonated bank in MY' },
]

export function StatsBar() {
  return (
    <section className="py-16 px-6 bg-[#F4F5F7] border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="text-center">
                <div className="font-heading font-bold text-3xl sm:text-4xl text-[#0052CC] mb-2">{stat.value}</div>
                <div className="text-[#0A0A0A]/70 text-sm">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
