import { useState, useEffect } from 'react'

const STEP_DURATION = 2000 // 2 seconds per step
const CYCLE_DURATION = 8000 // 8 seconds per scenario

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
  const [scenario, setScenario] = useState(0) // 0 = Maybank, 1 = TnG
  const [step, setStep] = useState(0) // 0-3
  const [cycleTime, setCycleTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleTime((t) => {
        const next = t + 100
        if (next >= CYCLE_DURATION) {
          setScenario((s) => (s + 1) % 2)
          return 0
        }
        return next
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setStep(Math.min(3, Math.floor(cycleTime / STEP_DURATION)))
  }, [cycleTime])

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
      left: {
        title: 'WhatsApp',
        badge: null,
        from: 'TNG eWallet Support 🟢',
        messageBeforeLink: 'Your TnG eWallet has unusual activity. Your balance of RM 847.50 is at risk. Verify identity now to unlock: ',
        link: 'tngwallet-support.com/unlock?id=MY2024',
        style: 'whatsapp',
      },
      center: {
        text1: 'Scanning redirect chain...',
        text2: 'Following 4 redirect hops...',
      },
      right: {
        lines: [
          '⚠ Impersonating TNG eWallet',
          '⚠ Macau Scam Pattern Detected',
          '⚠ 4-hop Redirect Chain',
          '⚠ Linked to 3 known fraud reports',
        ],
        footer: 'This is a known Macau scam targeting Malaysians.',
      },
    },
  }

  const s = SCENARIOS[scenario]
  const showLeft = true
  const showCenter = step >= 1 && step <= 2
  const showRight = step >= 2
  const centerPhase = step === 1 ? 0 : step === 2 ? 1 : -1
  const isFadingOut = step === 3

  return (
    <div className="mb-6">
      <div className={`flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 transition-opacity duration-500 ${isFadingOut ? 'opacity-40' : 'opacity-100'}`}>
      {/* Left phone */}
      <div className="relative w-[280px] sm:w-[300px]">
        <div className="rounded-[2.5rem] border-2 border-white/10 bg-[#0d1117] p-2 shadow-2xl transition-all">
          <div className="rounded-[2rem] overflow-hidden bg-[#1a1a1a] h-[560px]">
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
              {centerPhase === 0 ? s.center.text1 : centerPhase === 1 ? s.center.text2 : ''}
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
