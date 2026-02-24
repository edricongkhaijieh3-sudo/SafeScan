import { ScrollReveal } from './ScrollReveal'
import { BankLogosMarquee } from './BankLogos'

const CARDS = [
  {
    icon: '📱',
    title: 'QR Code Phishing',
    desc: 'Fake QR codes at parking meters, restaurants, and events redirect you to malicious sites silently.',
    stat: '↑ 500% increase since 2022',
  },
  {
    icon: '🔗',
    title: 'Malicious Links',
    desc: 'Links in texts, emails, and DMs redirect through multiple domains before reaching the payload.',
    stat: '3.4B phishing emails sent daily',
  },
  {
    icon: '📎',
    title: 'Infected Files',
    desc: 'PDFs, Word docs, and ZIPs can execute malicious code the moment you open them — even if they look legitimate.',
    stat: '#1 malware delivery vector globally',
  },
]

export function Problem() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span className="text-[#0052CC] text-sm font-semibold tracking-wider uppercase">The Problem</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] mt-4 mb-6">
            Every day, threats hide in plain sight.
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            QR codes at restaurants, links in your messages, files from colleagues — any of them could be compromised.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-gray-500 text-sm mt-8 mb-4">Phishing often impersonates trusted brands — including banks like</p>
          <div className="relative overflow-hidden py-3 mb-8 flex min-h-[64px]">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />
            <BankLogosMarquee />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {CARDS.map((card, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="p-6 rounded-2xl bg-[#F4F5F7] border border-gray-200 hover:border-[#0052CC]/40 transition-colors">
                <span className="text-3xl mb-4 block">{card.icon}</span>
                <h3 className="font-heading font-bold text-xl text-[#0A0A0A] mb-3">{card.title}</h3>
                <p className="text-[#0A0A0A]/70 text-sm mb-4">{card.desc}</p>
                <p className="text-[#00875A] text-sm font-medium">{card.stat}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
