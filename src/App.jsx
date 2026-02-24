import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { supabase } from './lib/supabase'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'

// Below-the-fold: code-split so they load after initial paint
const StatsBar = lazy(() => import('./components/StatsBar').then(m => ({ default: m.StatsBar })))
const NewsCards = lazy(() => import('./components/NewsCards').then(m => ({ default: m.NewsCards })))
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })))
const Problem = lazy(() => import('./components/Problem').then(m => ({ default: m.Problem })))
const HowItWorks = lazy(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })))
const Survey = lazy(() => import('./components/Survey').then(m => ({ default: m.Survey })))
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })))
const FinalCTA = lazy(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })))
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })))

const WAITLIST_SEED = 100 // Base number so count always looks believable

function App() {
  const [waitlistCount, setWaitlistCount] = useState(null)

  const fetchCount = useCallback(async () => {
    if (supabase) {
      try {
        const { count, error } = await supabase.from('waitlist').select('*', { count: 'exact', head: true })
        if (!error && count !== null) {
          setWaitlistCount(WAITLIST_SEED + count)
        }
      } catch {
        // Ignore
      }
    }
  }, [])

  useEffect(() => {
    if (supabase) {
      fetchCount()
    } else {
      setWaitlistCount(WAITLIST_SEED)
    }
  }, [fetchCount])

  const displayCount = waitlistCount ?? WAITLIST_SEED

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav />
      <main>
        <Hero onWaitlistUpdate={fetchCount} waitlistCount={displayCount} />
        <Suspense fallback={null}>
          <StatsBar />
          <NewsCards />
          <Testimonials />
          <Problem />
          <HowItWorks />
          <Survey onWaitlistUpdate={fetchCount} />
          <Pricing />
          <FinalCTA onWaitlistUpdate={fetchCount} waitlistCount={displayCount} />
          <Footer />
        </Suspense>
      </main>
      <Analytics />
    </div>
  )
}

export default App
