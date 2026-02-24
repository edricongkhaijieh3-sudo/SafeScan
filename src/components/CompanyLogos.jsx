/**
 * Company logos for "Built by people from" marquee.
 * White/light grey versions for dark background.
 */

const LOGOS = [
  { name: 'Stanford', src: '/logos/stanford.png' },
  { name: 'Harvard', src: '/logos/harvard.png' },
  { name: 'NVIDIA', src: '/logos/nvidia.svg' },
  { name: 'Apple', src: '/logos/apple.svg' },
  { name: 'Google', src: '/logos/google.svg' },
  { name: 'Meta', src: '/logos/meta.svg' },
  { name: 'Oracle', src: '/logos/oracle.svg' },
  { name: 'Microsoft', src: '/logos/microsoft.svg' },
]

export function CompanyLogo({ logo, index }) {
  return (
    <div
      key={`${logo.name}-${index}`}
      className="flex-shrink-0 mx-10 flex items-center justify-center h-16"
      title={logo.name}
    >
      <img
        src={logo.src}
        alt={logo.name}
        className="h-12 w-auto max-w-[140px] object-contain opacity-90 hover:opacity-100 transition-opacity"
      />
    </div>
  )
}

export function CompanyLogosMarquee() {
  return (
    <>
      {[...LOGOS, ...LOGOS].map((logo, i) => (
        <CompanyLogo logo={logo} index={i} key={`${logo.name}-${i}`} />
      ))}
    </>
  )
}
