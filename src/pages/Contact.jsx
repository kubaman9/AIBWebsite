import { useState, useEffect } from 'react'
import { Mail, Send, Linkedin, Instagram, AlertCircle, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

// Initialize EmailJS
emailjs.init('uzXUV-_9ECFhGLy1O') // Your public key

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    })) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
     emailjs
      .sendForm("service_uu4scuq", 'template_uz4tgdj', e.target, 'EiJleWTavSt29u8Do')
      .then(() => {
        alert("Message sent!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert("Oops, something went wrong. Try again."));
  }

  return (
    <div className="w-full bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 min-h-screen pt-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Have questions or want to join? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Form and Info Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information - BeInvolved */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Get Involved</h2>
            
            <div className="space-y-6">
              

            <a
              href="https://beinvolved.indiana.edu/organization/aib"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">BeInvolved</h3>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Join our official club on Indiana University's student portal and contact Executixe members
              </p>
            </a>

                {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/ai-in-business-society-at-indiana-university/posts/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                  <Linkedin className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">LinkedIn</h3>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Connect with us and stay updated on our latest AI insights
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/aibindiana/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-500 rounded-lg flex items-center justify-center group-hover:bg-purple-500/40 transition-colors">
                  <Instagram className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Instagram</h3>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Follow our journey and be part of the AI revolution
              </p>
            </a>

              <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Connect With Us</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Whether you're curious about AI, looking to collaborate on projects, or want to attend our events, we'd love to connect. Find us on social media or register through BeInvolved to stay in the loop.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50"
                  placeholder="your.email@iu.edu"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none disabled:opacity-50"
                  placeholder="Tell us what you're interested in..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-500 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin">⏳</div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {submitted && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500 text-green-300 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                ✓ Message sent! We'll get back to you soon.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
