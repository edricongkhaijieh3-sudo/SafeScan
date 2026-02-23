export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080c10]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-xl tracking-tight">
          <span className="text-[#00ff87]">Safe</span>
          <span className="text-white">Scan</span>
        </a>
        <a
          href="#waitlist"
          className="px-5 py-2.5 rounded-lg bg-[#00ff87] text-[#080c10] font-semibold text-sm hover:bg-[#00e078] transition-colors"
        >
          Get Early Access
        </a>
      </div>
    </nav>
  )
}
