import { ScrollReveal } from './ScrollReveal'

const TESTIMONIALS = [
  {
    initial: 'A',
    name: 'Ahmad',
    location: 'Petaling Jaya',
    flag: '🇲🇾',
    text: 'Finally something for msians la 😭 my parents forward me scam links every week cannot tahan',
    time: '11:47',
  },
  {
    initial: 'N',
    name: 'Nurul',
    location: 'Johor Bahru',
    flag: '🇲🇾',
    text: 'Kawan I almost kena TNG scam last month. Dah share this to my whole family group',
    time: '8:23',
  },
  {
    initial: 'W',
    name: 'Wei Liang',
    location: 'Penang',
    flag: '🇲🇾',
    text: 'Wa cao every week also have scam link in my family WhatsApp group. Parents always ask me \'is this real?\'. Now I just send them scanguard.my 🙏',
    time: '2:51',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-[#E5DDD5]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] tracking-tight">
            What Malaysians are saying
          </h2>
          <div className="mx-auto mt-3 w-16 h-1 rounded-full bg-[#25D366]" />
        </div>
        </ScrollReveal>
        <div className="space-y-6">
          {TESTIMONIALS.map((t, i) => {
            const isRight = i === 1 // Nurul
            return (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`flex flex-col w-full ${isRight ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-end gap-2 ${isRight ? 'flex-row-reverse' : ''}`}>
                    {/* Profile photo circle - initials in green */}
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ background: '#25D366' }}
                    >
                      {t.initial}
                    </div>
                    {/* WhatsApp bubble */}
                    <div
                      className={`relative max-w-[85%] sm:max-w-[75%] rounded-[18px] px-4 py-3 ${
                        isRight ? 'rounded-tr-[4px]' : 'rounded-tl-[4px]'
                      }`}
                      style={{
                        background: '#005c4b',
                        boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                      }}
                    >
                      <p className="text-white/95 text-[15px] leading-relaxed whitespace-pre-line">
                        {t.text}
                      </p>
                      <div className="flex justify-end items-center gap-1.5 mt-1">
                        <span className="text-[11px] text-white/60">{t.time}</span>
                        <span className="text-[#53bdeb] text-xs" aria-hidden="true">✓✓</span>
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm text-[#0A0A0A]/70 mt-2 ${isRight ? 'mr-11 text-right' : 'ml-11'}`}>
                    {t.name}, {t.location} {t.flag}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
