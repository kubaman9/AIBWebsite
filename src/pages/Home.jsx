import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

// Particle component for animated background
function Particle({ delay, duration, className }) {
  return (
    <div
      className={`particle ${className}`}
      style={{
        left: Math.random() * 100 + '%',
        bottom: '-10px',
        animationDelay: delay + 's',
        animationDuration: duration + 's',
      }}
    >
      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm"></div>
    </div>
  )
}

// Executive board data - will use actual photos from the provided image
const executiveBoard = [
  {
    name: 'Benjamin Levens',
    role: 'President of AIB',
  },
  {
    name: 'Jakub Kielczewski',
    role: 'Vice President of AIB',
  },
  {
    name: 'Jacob Petersen',
    role: 'Director of Networking',
  },
  {
    name: 'Jacob Norris',
    role: 'Director of Programming and Events',
  },
  {
    name: 'Keira Kapadia',
    role: 'Director of Professional Development and Corporate Relations',
  },
  {
    name: 'Cole Chapman',
    role: 'Director of AI Integration',
  },
  {
    name: 'Harper Larkin',
    role: 'Director of Digital and Social Media',
  },
]

export default function Home() {
  const aboutRef = useRef(null)

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Generate particles with staggered delays - increased to 40 particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: (i * 0.01) % 1,
    duration: 8 + (i % 4) * 2.5,
    className: `particle-${(i % 4) + 1}`,
  }))

  return (
    <div className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-purple-900">
      {/* Hero Section with Logo and Particles */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-slate-950 via-blue-900 to-purple-900">
        {/* Animated Particle Background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              delay={particle.delay}
              duration={particle.duration}
              className={particle.className}
            />
          ))}
        </div>

        {/* Content - positioned above particles */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo Container - fixed padding */}
          <div className="animate-float-up mb-12">
            <div className="animate-pulse-glow">
              <img
                src="/AIBWebsite/aib-logo.png"
                alt="AIB Club Logo"
                className="w-56 h-56 md:w-72 md:h-72 object-contain"
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="animate-float-up text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              AI in Business Club
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light">
              at Indiana University
            </p>
          </div>

          {/* Tagline Description */}
          <p className="animate-float-up text-center text-gray-300 text-lg md:text-xl max-w-2xl mb-16">
            Connect with Real Businesses. Learn Real AI. Build Your Future.
          </p>

          {/* Down Arrow */}
          <div className="animate-float-up flex justify-center">
            <ChevronDown className="w-8 h-8 text-blue-300 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="py-20 px-4 bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900"
      >
        <div className="max-w-5xl mx-auto">
          {/* About Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            About <span className="bg-gradient-to-r from-blue-700 to-purple-300 bg-clip-text text-transparent">
              AI in Business Club
            </span>
          </h2>

          {/* About Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div className="bg-slate-700/50 border border-slate-600 hover:border-blue-400 p-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Real-World Learning</h3>
              <p className="text-gray-300 leading-relaxed">
                We connect students with leading businesses to understand how AI is transforming industries. Through partnerships and real projects, you'll see AI in action beyond the classroom.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-700/50 border border-slate-600 hover:border-purple-400 p-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <h3 className="text-2xl font-bold text-purple-300 mb-4">Events & Learning</h3>
              <p className="text-gray-300 leading-relaxed">
                We host guest speakers from industry leaders, hands-on workshops, and collaborative projects. Whether you're a beginner or expert, there's always something new to learn and experience.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-700/50 border border-slate-600 hover:border-cyan-400 p-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">Your Career</h3>
              <p className="text-gray-300 leading-relaxed">
                Based in Luddy School of Informatics, we collaborate with Kelley School of Business and career services to help you land internships and full-time opportunities in AI.
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-8 mb-16">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              The AI in Business Club is more than just a student organization—it's a bridge between academic learning and professional application. We're passionate about demystifying AI and showing how it's reshaping business strategy, operations, and innovation across every industry.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our members come from diverse backgrounds, from computer science and business majors to those just curious about AI. We believe everyone has a role to play in the AI revolution, and our community is here to support your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Board Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">
            Meet the <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              2025 Executive Board
            </span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12">
            Dedicated leaders driving AI innovation at Indiana University
          </p>

          {/* Executive Board Photo Box */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-3xl bg-slate-800 border-2 border-slate-700 hover:border-blue-500 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              {/* Photo Container with proper aspect ratio */}
              <div className="w-full aspect-auto bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                <img
                  src="/AIBWebsite/executive-board.jpg"
                  alt="2025 Executive Board"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Caption */}
              <div className="p-8 text-center bg-slate-800">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Our Leadership Team
                </h3>
                <p className="text-gray-300 text-lg">
                  Meet the 2025 Executive Board Members driving innovation and excellence in the AI in Business Club
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-6">
              Want to be part of our leadership team next year?
            </p>
            <a href="https://beinvolved.indiana.edu/organization/aib" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105">
              Join Our Community
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <p className="text-gray-400">Active Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                10+
              </div>
              <p className="text-gray-400">Events Yearly</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                5+
              </div>
              <p className="text-gray-400">Corporate Partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-400">Passionate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
