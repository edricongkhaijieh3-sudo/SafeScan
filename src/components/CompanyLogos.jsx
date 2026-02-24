/**
 * Company logos for "Built by people from" marquee.
 * Uses CDN (Simple Icons) for reliability on deploy; local PNGs for Stanford/Harvard.
 */

const CDN = 'https://cdn.simpleicons.org'
const ICON_COLOR = '0a0a0a' // Matches text #0A0A0A
const LOGOS = [
  { name: 'Stanford', src: '/logos/stanford.png' },
  { name: 'Harvard', src: '/logos/harvard.png' },
  { name: 'NVIDIA', src: `${CDN}/nvidia/${ICON_COLOR}` },
  { name: 'Apple', src: `${CDN}/apple/${ICON_COLOR}` },
  { name: 'Google', src: '/logos/google.svg' },
  { name: 'Meta', src: `${CDN}/meta/${ICON_COLOR}` },
  { name: 'Cisco', src: `${CDN}/cisco/${ICON_COLOR}` },
  { name: 'Cloudflare', src: `${CDN}/cloudflare/${ICON_COLOR}` },
  { name: 'Fortinet', src: `${CDN}/fortinet/${ICON_COLOR}` },
  { name: 'Palo Alto Networks', src: `${CDN}/paloaltonetworks/${ICON_COLOR}` },
  { name: 'Okta', src: `${CDN}/okta/${ICON_COLOR}` },
  { name: 'Splunk', src: `${CDN}/splunk/${ICON_COLOR}` },
]

export function CompanyLogo({ logo, index }) {
  return (
    <div
      key={`${logo.name}-${index}`}
      className="flex-shrink-0 mx-10 flex items-center justify-center h-16 min-w-[100px]"
      title={logo.name}
    >
      <img
        src={logo.src}
        alt={logo.name}
        className="h-12 w-auto max-w-[140px] object-contain opacity-90 hover:opacity-100 transition-opacity"
        loading="eager"
      />
    </div>
  )
}

export function CompanyLogosMarquee() {
  return (
    <div className="flex flex-shrink-0 w-max animate-marquee-fast">
      {[...LOGOS, ...LOGOS].map((logo, i) => (
        <CompanyLogo logo={logo} index={i} key={`${logo.name}-${i}`} />
      ))}
    </div>
  )
}
