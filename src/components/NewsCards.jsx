import { ScrollReveal } from './ScrollReveal'

const NEWS_ITEMS = [
  {
    source: 'The Star',
    sourceUrl: 'https://www.thestar.com.my',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Star_Malaysia_Logo.svg/320px-The_Star_Malaysia_Logo.svg.png',
    headline: 'Maybank rolls out malware detection to MAE app amid rising phishing threats',
    date: '13 Aug 2024',
    url: 'https://www.thestar.com.my/tech/tech-news/2024/08/13/maybank-rolling-out-malware-blocking-feature-to-mae-app',
  },
  {
    source: 'Focus Malaysia',
    sourceUrl: 'https://focusmalaysia.my',
    logo: 'https://focusmalaysia.my/wp-content/uploads/logo1x-fm.png',
    headline: 'Fake Touch \'n Go QR codes and links target eWallet users — authorities urge caution',
    date: '2024',
    url: 'https://focusmalaysia.my/netizens-cry-foul-over-latest-scam-involving-fake-touch-n-go-link/',
  },
  {
    source: 'Malay Mail',
    sourceUrl: 'https://www.malaymail.com',
    logo: 'https://www.malaymail.com/theme_malaymail/images/logo.svg',
    headline: 'LHDN warns against phoney MyTax refund links',
    date: '4 Nov 2024',
    url: 'https://www.malaymail.com/news/malaysia/2024/11/04/lhdn-warns-against-phoney-mytax-refund-links/155753',
  },
]

export function NewsCards() {
  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#FFB800] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Real headlines from Malaysian media
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            It&apos;s happening around us
          </h2>
          <div className="mx-auto mt-4 w-24 h-1 bg-[#FFB800]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {NEWS_ITEMS.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <article className="h-full border-2 border-white/10 bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl hover:border-[#FFB800]/50 hover:-translate-y-1 transition-all duration-300">
                  {/* Source logo */}
                  <div className="flex items-center gap-2 mb-3">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.source}
                        className="h-6 sm:h-7 object-contain object-left max-w-[140px]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#0A0A0A] text-white text-xs font-bold">
                        {item.source.charAt(0)}
                      </span>
                    )}
                  </div>
                  {/* Headline */}
                  <h3 className="font-heading font-bold text-[#0A0A0A] text-base sm:text-lg leading-snug mb-3 group-hover:text-[#0052CC] transition-colors">
                    {item.headline}
                  </h3>
                  {/* Date */}
                  <p className="text-xs text-[#0A0A0A]/50">{item.date}</p>
                  <span className="inline-block mt-3 text-sm font-medium text-[#0052CC] group-hover:underline">
                    Read article →
                  </span>
                </article>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
