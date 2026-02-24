export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#" className="font-heading font-bold text-xl tracking-tight">
            <span className="text-[#0A0A0A]">Scanguard</span>
          </a>
          <p className="text-gray-500 text-sm mt-1">Scan anything. Fear nothing.</p>
        </div>
        <p className="text-[#0A0A0A]/70 text-sm text-center md:text-right">
          Building in public. Questions? <a href="mailto:scanguard@gmail.com" className="text-[#0052CC] hover:underline">Scanguard@gmail.com</a>
        </p>
      </div>
      <p className="text-gray-400 text-xs text-center mt-8">© 2026 Scanguard. No data stored. No tracking.</p>
    </footer>
  )
}
