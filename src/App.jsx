import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import Home from './pages/Home'
import AITools from './pages/AITools'
import Contact from './pages/Contact'

function App() {
  return (
    <>
      <Loading />
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
    </>
  )
}

export default App
