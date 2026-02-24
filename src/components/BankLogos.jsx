/**
 * Malaysian bank & e-wallet logos — brands commonly impersonated in phishing.
 * Coloured backgrounds for banks with white/light logos so they remain visible.
 */

const BANKS = [
  { name: 'Touch \'n Go eWallet', src: '/logos/banks/touchngo.svg', fill: true },
  { name: 'Maybank', src: '/logos/banks/maybank.svg', fill: true },
  { name: 'CIMB Bank', src: '/logos/banks/cimb-logo.png', isImage: true },
  { name: 'GrabPay', src: '/logos/banks/grab-logo.png', isImage: true },
  { name: 'Public Bank', src: '/logos/banks/publicbank-logo.png', isImage: true },
  { name: 'RHB Bank', src: '/logos/banks/rhb-logo.png', isImage: true },
  { name: 'Hong Leong Bank', src: '/logos/banks/hongleong-logo.png', isImage: true, larger: true },
  { name: 'OCBC Bank', src: '/logos/banks/ocbc-logo.png', isImage: true, larger: true },
]

function BankLogo({ bank, index }) {
  const bgClass = bank.bg ? '' : 'bg-white'
  const containerClass = bank.isImage
    ? `flex-shrink-0 mx-4 flex items-center justify-center rounded-lg ${bank.larger ? 'h-16 min-w-[160px] px-3 py-2' : 'h-14 min-w-[130px] px-3 py-2'}`
    : 'flex-shrink-0 mx-4 flex items-center justify-center h-14 min-w-[110px] px-3 py-2 rounded-lg'
  const imgClass = bank.isImage
    ? `h-full w-auto object-contain object-center opacity-95 hover:opacity-100 transition-opacity ${bank.larger ? 'max-h-14 max-w-[180px]' : 'max-h-12 max-w-[160px]'}`
    : bank.fill
      ? 'h-12 w-auto max-w-[140px] object-contain opacity-95 hover:opacity-100 transition-opacity'
      : 'h-10 w-auto max-w-[120px] object-contain opacity-95 hover:opacity-100 transition-opacity'
  return (
    <div
      key={`${bank.name}-${index}`}
      className={`${containerClass} ${bgClass}`}
      style={bank.bg ? { backgroundColor: bank.bg } : undefined}
      title={bank.name}
    >
      <img
        src={bank.src}
        alt={bank.name}
        className={imgClass}
      />
    </div>
  )
}

export function BankLogosMarquee() {
  return (
    <div className="flex flex-shrink-0 w-max animate-marquee">
      {[...BANKS, ...BANKS].map((bank, i) => (
        <BankLogo bank={bank} index={i} key={`${bank.name}-${i}`} />
      ))}
    </div>
  )
}
