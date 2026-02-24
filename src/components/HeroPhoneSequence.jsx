import { useState, useEffect } from 'react'

// Variable step boundaries (ms): [0] left only, [1] center analyzing, [2] threat, [3] fade
const STEP_BOUNDARIES = [0, 1200, 2400, 6200, 7600] // threat shown 3.8s before fade; extra delay so full scenario visible
const CYCLE_DURATION = STEP_BOUNDARIES[4]

function TypewriterText({ text, visible, delay = 0, resetKey }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setStarted(false)
  }, [resetKey])

  useEffect(() => {
    if (!visible) {
      setDisplayed('')
      setStarted(false)
      return
    }
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [visible, delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [started, text])

  return <span>{displayed}</span>
}

export function HeroPhoneSequence() {
  const [scenario, setScenario] = useState(0) // 0 = Maybank, 1 = QR Code
  const [cycleTime, setCycleTime] = useState(0)

  useEffect(() => {
    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += 100
      if (elapsed >= CYCLE_DURATION) {
        setScenario((s) => (s + 1) % 2)
        elapsed = 0
      }
      setCycleTime(elapsed)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const step = (() => {
    for (let i = STEP_BOUNDARIES.length - 2; i >= 0; i--) {
      if (cycleTime >= STEP_BOUNDARIES[i]) return i
    }
    return 0
  })()

  const SCENARIOS = {
    0: {
      left: {
        title: 'Messages',
        from: '+60 19-238 4721',
        badge: '1 new message',
        messageBeforeLink: '[MAYBANK2U] Anda perlu mengesahkan akaun anda dalam masa 24 jam atau akaun akan dibekukan. Klik: ',
        link: 'maybank2u-secure.net/verify',
        style: 'iMessage',
      },
      center: {
        text1: 'Analysing link...',
        text2: 'Cross-checking 47 threat databases...',
      },
      right: {
        lines: [
          '⚠ Phishing Domain',
          '⚠ Fake Maybank2u Login Page',
          '⚠ Credential Harvester Active',
          '⚠ Domain registered 3 days ago',
        ],
        footer: 'Threat blocked before reaching your device.',
      },
    },
    1: {
      left: { type: 'camera' },
      center: {
        texts: ['Detonating in sandbox...', 'Checking destination URL...', 'Analysing page behaviour...'],
      },
      right: {
        lines: [
          '⚠ Phishing QR Code',
          '⚠ Redirects to Fake LHDN Portal',
          '⚠ Designed to Steal MyKad & Bank Info',
          '⚠ Reported by 847 users',
        ],
        footer: 'This QR code was planted at a public location.',
      },
    },
  }

  const s = SCENARIOS[scenario]
  const showLeft = true
  const showCenter = step >= 1 && step <= 2
  const showRight = step >= 2
  const isQRScenario = scenario === 1
  const centerPhase = isQRScenario
    ? (step >= 1 && step <= 2 ? Math.min(2, Math.max(0, Math.floor((cycleTime - STEP_BOUNDARIES[1]) / 1067))) : -1)
    : (step === 1 ? 0 : step === 2 ? 1 : -1)
  const centerText = isQRScenario && s.center.texts
    ? s.center.texts[Math.min(centerPhase, s.center.texts.length - 1)]
    : (centerPhase === 0 ? s.center.text1 : centerPhase === 1 ? s.center.text2 : '')
  const isFadingOut = step === 3

  return (
    <div className="mb-6">
      <div className={`flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 transition-opacity duration-500 ${isFadingOut ? 'opacity-40' : 'opacity-100'}`}>
      {/* Left phone */}
      <div className="relative w-[280px] sm:w-[300px]">
        <div className="rounded-[2.5rem] border-2 border-white/10 bg-[#0d1117] p-2 shadow-2xl transition-all">
          <div className="rounded-[2rem] overflow-hidden bg-[#1a1a1a] h-[560px] flex flex-col">
            {s.left.type === 'camera' ? (
              <>
                <div className="h-12 flex-shrink-0 flex items-center justify-center border-b border-white/10">
                  <span className="text-white font-medium text-sm">Camera</span>
                </div>
                <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-6 bg-black/60">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Corner bracket guides (L-shaped scanner frame) */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg viewBox="0 0 192 192" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                        <path d="M24 24 L24 72 L28 72 L28 28 L72 28 L72 24 Z" fill="none" stroke="#00ff87" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M168 24 L168 72 L164 72 L164 28 L120 28 L120 24 Z" fill="none" stroke="#00ff87" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M168 168 L168 120 L164 120 L164 164 L120 164 L120 168 Z" fill="none" stroke="#00ff87" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M24 168 L24 120 L28 120 L28 164 L72 164 L72 168 Z" fill="none" stroke="#00ff87" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {/* QR code pattern */}
                    <div className="absolute w-32 h-32 bg-white p-1.5">
                      <svg viewBox="0 0 25 25" className="w-full h-full">
                        <rect width="25" height="25" fill="white" />
                        <rect x="1" y="1" width="7" height="7" fill="black" />
                        <rect x="3" y="3" width="3" height="3" fill="white" />
                        <rect x="17" y="1" width="7" height="7" fill="black" />
                        <rect x="19" y="3" width="3" height="3" fill="white" />
                        <rect x="1" y="17" width="7" height="7" fill="black" />
                        <rect x="3" y="19" width="3" height="3" fill="white" />
                        <rect x="10" y="1" width="2" height="2" fill="black" />
                        <rect x="13" y="1" width="2" height="2" fill="black" />
                        <rect x="10" y="4" width="2" height="2" fill="black" />
                        <rect x="13" y="4" width="2" height="2" fill="black" />
                        <rect x="1" y="10" width="2" height="2" fill="black" />
                        <rect x="4" y="10" width="2" height="2" fill="black" />
                        <rect x="7" y="10" width="2" height="2" fill="black" />
                        <rect x="10" y="10" width="5" height="5" fill="black" />
                        <rect x="12" y="12" width="1" height="1" fill="white" />
                        <rect x="17" y="10" width="2" height="2" fill="black" />
                        <rect x="10" y="17" width="2" height="2" fill="black" />
                        <rect x="13" y="17" width="2" height="2" fill="black" />
                        <rect x="17" y="17" width="2" height="2" fill="black" />
                        <rect x="20" y="17" width="2" height="2" fill="black" />
                        <rect x="17" y="20" width="2" height="2" fill="black" />
                        <rect x="20" y="20" width="2" height="2" fill="black" />
                      </svg>
                    </div>
                    {/* Scanning line */}
                    <div className="absolute left-4 right-4 top-[10%] h-0.5 bg-[#00ff87]/90 animate-scan-line pointer-events-none" />
                  </div>
                  <p className="text-white/70 text-xs mt-4 text-center">QR Code detected — scanning...</p>
                </div>
              </>
            ) : (
              <>
                <div className="h-12 flex items-center justify-center border-b border-white/10 relative">
                  <div className="w-20 h-1 rounded-full bg-white/30" />
                  {s.left.badge && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#00c4ff] font-medium">
                      {s.left.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-3 font-body text-sm">
                  <div className="text-white/50 text-xs">{s.left.title}</div>
                  <div className="relative">
                    <div className={`rounded-2xl rounded-bl-md p-3 ${s.left.style === 'whatsapp' ? 'bg-[#005c4b]' : 'bg-[#2d2d2d]'}`}>
                      <div className="text-white/60 text-xs mb-1">{s.left.from}</div>
                      <p className="text-white/90 text-xs leading-relaxed">
                        {s.left.messageBeforeLink}
                        <span className="text-[#00c4ff] underline underline-offset-1">{s.left.link}</span>
                      </p>
                    </div>
                    {(step === 0 || step === 1) && (
                      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none" style={{ animationDuration: '1.5s' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(255,255,255,0.95)" className="drop-shadow-lg">
                          <path d="M12 2L8 8h3v10c0 1.1.9 2 2 2s2-.9 2-2V8h3L12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Center - Scanguard */}
      <div className="relative flex flex-col items-center justify-center min-h-[200px]">
        <div
          className={`relative flex flex-col items-center transition-all duration-500 ${
            showCenter ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
          }`}
        >
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              showCenter ? 'bg-[#00ff87]/20 shadow-[0_0_30px_rgba(0,255,135,0.5)]' : 'bg-white/5'
            }`}
          >
            {showCenter && step === 1 ? (
              <div className="w-10 h-10 border-2 border-[#00ff87] border-t-transparent rounded-full animate-spin" />
            ) : showCenter && step === 2 ? (
              <div className="w-10 h-10 border-2 border-[#00ff87] border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00ff87" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            )}
          </div>
          {showCenter && (
            <p className="text-[#00ff87] text-xs font-medium mt-3 text-center min-h-[2rem]">
              {centerText}
            </p>
          )}
          <span className="text-xs font-medium mt-1 text-[#00ff87]/80">Scanguard</span>
        </div>
      </div>

      {/* Right phone */}
      <div
        className={`relative w-[280px] sm:w-[300px] transition-all duration-500 ${
          showRight && step >= 3 ? 'animate-pulse' : ''
        }`}
      >
        <div
          className={`rounded-[2.5rem] border-2 p-2 shadow-2xl transition-all duration-500 ${
            showRight
              ? 'border-[#ff4444]/50 bg-[#0d1117] shadow-[0_0_40px_rgba(255,68,68,0.3)]'
              : 'border-white/10 bg-[#0d1117]'
          }`}
        >
          <div className="rounded-[2rem] overflow-hidden bg-[#1a1a1a] h-[560px]">
            <div className="h-12 flex items-center justify-center border-b border-white/10">
              <div className="w-20 h-1 rounded-full bg-white/30" />
            </div>
            <div className="p-4 space-y-3 font-body text-sm">
              {showRight && (
                <>
                  <div
                    className={`bg-[#ff4444]/20 border border-[#ff4444]/40 rounded-xl p-3 text-center transition-all duration-300 ${
                      step >= 3 ? 'animate-pulse' : ''
                    }`}
                  >
                    <span className="text-[#ff4444] font-bold text-xs">⚠ THREAT DETECTED</span>
                  </div>
                  <div className="space-y-1.5">
                    {s.right.lines.map((line, i) => (
                      <div key={i} className="text-[#ff4444] font-medium text-xs min-h-[1.25rem]">
                        <TypewriterText
                          text={line}
                          visible={showRight}
                          delay={i * 250}
                          resetKey={scenario}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center py-3">
                    <span
                      className={`px-6 py-2.5 rounded-xl bg-[#ff4444]/30 border border-[#ff4444] text-[#ff4444] font-bold text-base ${
                        step >= 3 ? 'animate-pulse' : ''
                      }`}
                    >
                      BLOCKED
                    </span>
                  </div>
                  <p className="text-white/50 text-xs text-center min-h-[2rem]">
                    <TypewriterText text={s.right.footer} visible={showRight} delay={1200} resetKey={scenario} />
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Scenario indicator */}
      <div className="flex justify-center gap-2 mt-6">
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            scenario === 0 ? 'bg-[#00ff87] scale-125' : 'bg-white/30'
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            scenario === 1 ? 'bg-[#00ff87] scale-125' : 'bg-white/30'
          }`}
        />
      </div>
    </div>
  )
}
