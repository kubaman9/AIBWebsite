import { useState } from 'react'
import { Mail, Send, Linkedin, Instagram, AlertCircle, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

// Simple HTML tag stripper to prevent XSS in submitted values
function sanitize(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()
}

function validate(formData) {
  const errors = {}

  const name = formData.name.trim()
  if (!name) {
    errors.name = 'Name is required.'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (name.length > 100) {
    errors.name = 'Name must be under 100 characters.'
  }

  const email = formData.email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    errors.email = 'Email is required.'
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.'
  } else if (email.length > 254) {
    errors.email = 'Email address is too long.'
  }

  const message = formData.message.trim()
  if (!message) {
    errors.message = 'Message is required.'
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  } else if (message.length > 2000) {
    errors.message = 'Message must be under 2000 characters.'
  }

  return errors
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const errors = validate(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      setError('Email service is not configured. Please contact the administrator.')
      return
    }

    setLoading(true)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: sanitize(formData.name),
          from_email: sanitize(formData.email),
          message: sanitize(formData.message),
        },
        EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setError('Something went wrong. Please try again or reach us through social media.')
    } finally {
      setLoading(false)
    }
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
          {/* Contact Information */}
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
                  <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">BeInvolved</h3>
                </div>
                <p className="text-gray-400">
                  Join our official club on Indiana University's student portal and contact Executive members
                </p>
              </a>

              <a
                href="https://www.linkedin.com/company/ai-in-business-society-at-indiana-university/posts/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">LinkedIn</h3>
                </div>
                <p className="text-gray-400">
                  Connect with us and stay updated on our latest AI insights
                </p>
              </a>

              <a
                href="https://www.instagram.com/aibindiana/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 border border-purple-500 rounded-lg flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Instagram</h3>
                </div>
                <p className="text-gray-400">
                  Follow our journey and be part of the AI revolution
                </p>
              </a>

              <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Connect With Us</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Whether you're curious about AI, looking to collaborate on projects, or want to attend our events,
                  we'd love to connect. Find us on social media or register through BeInvolved to stay in the loop.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>

            {submitted ? (
              <div className="p-6 bg-green-500/20 border border-green-500 text-green-300 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-200">Message sent!</p>
                  <p className="text-sm mt-1">We'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-sm underline hover:text-green-200 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name */}
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
                    maxLength={100}
                    autoComplete="name"
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                      fieldErrors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    placeholder="Your name"
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
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
                    maxLength={254}
                    autoComplete="email"
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                      fieldErrors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    placeholder="your.email@iu.edu"
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
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
                    maxLength={2000}
                    rows="5"
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors resize-none disabled:opacity-50 ${
                      fieldErrors.message
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    placeholder="Tell us what you're interested in..."
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {fieldErrors.message ? (
                      <p id="message-error" className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {fieldErrors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className={`text-xs ${formData.message.length > 1800 ? 'text-yellow-400' : 'text-gray-500'}`}>
                      {formData.message.length}/2000
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-500 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
