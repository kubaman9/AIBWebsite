import { useState, useEffect } from 'react'

function getTimeLeft(launchTime) {
  const diff = launchTime - new Date()
  if (diff <= 0) return null
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function ComingSoon({ launchTime }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(launchTime))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(launchTime))
    }, 1000)
    return () => clearInterval(interval)
  }, [launchTime])

  return (
    <div className="fixed inset-0 z-[70] bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex flex-col items-center justify-center overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/20 blur-[80px]" />
      </div>

      {/* Logo badge */}
      <div className="relative mb-8 flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
          <span className="text-white font-extrabold text-2xl tracking-tight">AIB</span>
        </div>
        <p className="text-slate-400 text-xs tracking-[0.25em] uppercase">
          AI in Business Club &mdash; Indiana University
        </p>
      </div>

      {/* Heading */}
      <h1 className="relative text-5xl md:text-7xl font-extrabold text-center mb-3 bg-gradient-to-r from-blue-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
        Launching Soon
      </h1>
      <p className="relative text-slate-400 text-base md:text-lg text-center mb-14 max-w-sm px-4">
        Something exciting is on its way. Check back at launch.
      </p>

      {/* Countdown */}
      {timeLeft ? (
        <div className="relative flex gap-4 md:gap-8">
          {[
            { label: 'Days',    value: timeLeft.days    },
            { label: 'Hours',   value: timeLeft.hours   },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl px-4 py-4 min-w-[68px] md:min-w-[84px] text-center backdrop-blur-sm">
                <span className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-blue-300 to-purple-400 bg-clip-text text-transparent tabular-nums">
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-slate-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="relative text-blue-300 text-xl font-semibold animate-pulse">
          Launching now...
        </p>
      )}
    </div>
  )
}
