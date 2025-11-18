import { useState, useEffect } from 'react'

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-slate-900 z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Clock-like loading spinner */}
        <div className="relative w-20 h-20">
          {/* Circle background */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-700/50"></div>
          
          {/* Clock hand animation */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-500 animate-spin"></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-white font-semibold text-lg">Loading</p>
      </div>
    </div>
  )
}
