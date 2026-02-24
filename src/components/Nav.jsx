export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-xl tracking-tight text-[#0A0A0A] flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A0A0A]">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Scanguard
        </a>
        <a
          href="#waitlist"
          className="px-5 py-2.5 rounded-lg bg-[#0052CC] text-white font-semibold text-sm hover:bg-[#0747A6] transition-colors"
        >
          Get Early Access
        </a>
      </div>
    </nav>
  )
}
