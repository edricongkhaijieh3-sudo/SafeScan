import { ScrollReveal } from './ScrollReveal'

const STEPS = [
  {
    icon: '📷',
    title: 'Scan or Share',
    desc: "Use Scanguard's camera for QR codes, or share any link/file from any app",
  },
  {
    icon: '🔬',
    title: 'We Check It',
    desc: 'Opens in isolated cloud sandbox, watches behavior, cross-checks threat databases',
  },
  {
    icon: '✅',
    title: 'Get a Verdict',
    desc: 'Safe = redirected instantly. Threat = blocked with plain-English explanation',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span className="text-[#00c4ff] text-sm font-semibold tracking-wider uppercase">How It Works</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-6">
            Three steps. Less than 2 seconds.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {STEPS.map((step, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#00ff87]/50 to-transparent -translate-x-1/2" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-2xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-4xl mb-6">
                    {step.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-3">Step {i + 1}: {step.title}</h3>
                  <p className="text-white/70">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
