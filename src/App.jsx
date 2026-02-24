import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Explosion from './components/Explosion'
import Loading from './components/Loading'
import ComingSoon from './components/ComingSoon'
import Home from './pages/Home'
import AITools from './pages/AITools'
import Contact from './pages/Contact'

// ─── Launch timestamps ────────────────────────────────────────────────────────
// DEMO:  Feb 24 2026 at 00:15 Prague CET (UTC+1) = Feb 23 23:15 UTC
//const LAUNCH_TIME = new Date('2026-02-23T23:15:00Z')
// REAL:  Feb 27 2026 at 4:35 PM ET  (EST = UTC-5)  = 21:35 UTC
const LAUNCH_TIME = new Date('2026-02-27T21:35:00Z')
// ─────────────────────────────────────────────────────────────────────────────

function getInitialPhase() {
  return new Date() < LAUNCH_TIME ? 'comingsoon' : 'explosion'
}

function App() {
  const [phase, setPhase] = useState(getInitialPhase)

  useEffect(() => {
    if (phase === 'comingsoon') {
      const msUntilLaunch = LAUNCH_TIME - new Date()
      if (msUntilLaunch <= 0) { setPhase('explosion'); return }
      const t = setTimeout(() => setPhase('explosion'), msUntilLaunch)
      return () => clearTimeout(t)
    }

    if (phase === 'explosion') {
      const t1 = setTimeout(() => setPhase('loading'), 2500)
      const t2 = setTimeout(() => setPhase('main'), 3500)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [phase])

  return (
    <>
      {phase === 'comingsoon' && <ComingSoon launchTime={LAUNCH_TIME} />}
      {phase === 'explosion'  && <Explosion />}
      {phase === 'loading'    && <Loading />}

      {phase !== 'comingsoon' && (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
          <Navbar />
          <main className="flex-grow bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <footer className="bg-slate-900 border-t border-slate-700 text-center py-6 mt-12">
            <p className="text-slate-400 text-sm">
              © 2025 AI in Business Club at Indiana University. All rights reserved.
            </p>
          </footer>
        </div>
      )}
    </>
  )
}

export default App
