export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#" className="font-heading font-bold text-xl tracking-tight">
            <span className="text-[#00ff87]">Safe</span>
            <span className="text-white">Scan</span>
          </a>
          <p className="text-white/50 text-sm mt-1">Scan anything. Fear nothing.</p>
        </div>
        <p className="text-white/50 text-sm text-center md:text-right">
          Building in public. Questions? <a href="mailto:scanguard@gmail.com" className="text-[#00ff87] hover:underline">Scanguard@gmail.com</a>
        </p>
      </div>
      <p className="text-white/30 text-xs text-center mt-8">© 2026 Scanguard. No data stored. No tracking.</p>
    </footer>
  )
}
