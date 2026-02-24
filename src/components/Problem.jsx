import { ScrollReveal } from './ScrollReveal'
import { BankLogosMarquee } from './BankLogos'

const SCAM_IMAGES = {
  maybank: '/scam-mockup-maybank.webp',
  tng: '/scam-mockup-tng.webp',
  lhdn: '/scam-mockup-lhdn.webp',
}

const CARDS = [
  {
    mockupKey: 'maybank',
    title: 'Fake Maybank2u Links',
    desc: 'Real-looking phishing SMS with cloned Maybank branding. “Verify your account” or “suspended” messages that link to fake login pages.',
    stat: '↑ 312% increase in Malaysia 2024',
  },
  {
    mockupKey: 'tng',
    title: "Touch 'n Go QR Scams",
    desc: 'Fake wallet verification prompts and QR codes. “RM500 credited” or “update your details” messages that steal eWallet credentials.',
    stat: '↑ 247% increase in Malaysia 2024',
  },
  {
    mockupKey: 'lhdn',
    title: 'LHDN Refund Fraud',
    desc: 'Fake tax refund QR codes and links. “Claim your MyTax refund” messages impersonating LHDN to harvest bank and NRIC details.',
    stat: '↑ 189% increase in Malaysia 2024',
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
              <div className="p-6 rounded-2xl bg-[#F4F5F7] border border-gray-200 hover:border-[#0052CC]/40 transition-colors flex flex-col">
                <div className="mb-4 min-h-[120px] flex items-center justify-center">
                  {SCAM_IMAGES[card.mockupKey] && (
                    <img
                      src={SCAM_IMAGES[card.mockupKey]}
                      alt={`Example of ${card.title} scam`}
                      className="max-h-[180px] w-auto rounded-lg border border-gray-200 shadow-md object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0A0A0A] mb-3">{card.title}</h3>
                <p className="text-[#0A0A0A]/70 text-sm mb-4 flex-1">{card.desc}</p>
                <p className="text-[#00875A] text-sm font-medium mt-4 pt-4 border-t border-gray-200">{card.stat}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
