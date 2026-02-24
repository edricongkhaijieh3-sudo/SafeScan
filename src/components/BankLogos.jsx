/**
 * Malaysian bank & e-wallet logos — brands commonly impersonated in phishing.
 * Only includes brands where actual logos are available.
 */

const BANKS = [
  { name: 'Touch \'n Go eWallet', src: '/logos/banks/touchngo.svg' },
  { name: 'Maybank', src: '/logos/banks/maybank.svg' },
  { name: 'CIMB Bank', src: '/logos/banks/cimb.svg' },
  { name: 'GrabPay', src: '/logos/banks/grab.svg' },
]

export function BankLogosMarquee() {
  return (
    <div className="flex animate-marquee">
      {[...BANKS, ...BANKS].map((bank, i) => (
        <div
          key={`${bank.name}-${i}`}
          className="flex-shrink-0 mx-8 flex items-center justify-center h-14"
          title={bank.name}
        >
          <img
            src={bank.src}
            alt={bank.name}
            className="h-10 w-auto max-w-[140px] object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  )
}
