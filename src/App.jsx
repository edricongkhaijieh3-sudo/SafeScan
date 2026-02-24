import { useCallback } from 'react'
import { supabase } from './lib/supabase'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { StatsBar } from './components/StatsBar'
import { Problem } from './components/Problem'
import { HowItWorks } from './components/HowItWorks'
import { Survey } from './components/Survey'
import { Pricing } from './components/Pricing'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

function App() {
  const fetchCount = useCallback(async () => {
    if (supabase) {
      try {
        await supabase.from('waitlist').select('*', { count: 'exact', head: true })
      } catch {
        // Ignore
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#080c10]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav />
      <main>
        <Hero onWaitlistUpdate={fetchCount} />
        <StatsBar />
        <Problem />
        <HowItWorks />
        <Survey onWaitlistUpdate={fetchCount} />
        <Pricing />
        <FinalCTA onWaitlistUpdate={fetchCount} />
        <Footer />
      </main>
    </div>
  )
}

export default App
