import { useState } from 'react'
import { ExternalLink, Loader, AlertCircle } from 'lucide-react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { SYSTEM_PROMPT } from '../prompts/systemPrompt'


// Helper function to call Google Gemini API
async function generateProjectPlan(projectIdea) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env.local file.')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const userPrompt = `${SYSTEM_PROMPT}

Project idea: ${projectIdea}

Please generate a project plan in JSON format.`

  try {
    const result = await model.generateContent(userPrompt)
    const content = result.response.text()
    
    if (!content) {
      throw new Error('No response content from Gemini API')
    }

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse project plan from response. Response was: ' + content.substring(0, 100))
    }

    const plan = JSON.parse(jsonMatch[0])
    return plan
  } catch (error) {
    console.error('Error generating project plan:', error)
    
    // Handle different error types from Gemini API
    const errorMsg = error.message || JSON.stringify(error)
    
    // Check for authentication/quota/billing errors
    if (
      errorMsg.includes('quota') || 
      errorMsg.includes('billing') || 
      errorMsg.includes('insufficient') || 
      errorMsg.includes('exceeded') ||
      errorMsg.includes('401') ||
      errorMsg.includes('403') ||
      errorMsg.includes('Unauthorized') ||
      errorMsg.includes('invalid') ||
      errorMsg.includes('API key')
    ) {
      throw new Error(`Gemini API Issue: ${errorMsg}. Please check your API key at https://aistudio.google.com/app/apikeys`)
    }
    
    throw error
  }
}

// Project Idea Form Component
function ProjectIdeaForm({ onGenerate, isLoading }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onGenerate(input)
    }
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-12">
      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
          What project do you want to make?
        </span>
      </h2>
      <p className="text-gray-400 mb-6">
        Describe your AI project idea, and we'll generate a personalized plan with recommended tools.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Ex: AI-powered study planner, resume optimizer, club website..."
          className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-500 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Thinking...
            </>
          ) : (
            'Generate Plan'
          )}
        </button>
      </form>
    </div>
  )
}

// Project Plan Component
function ProjectPlan({ plan }) {
  if (!plan) return null

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-800 border-2 border-blue-500/50 rounded-xl p-8 mb-12">
      {/* Project Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
          {plan.title}
        </span>
      </h1>

      {/* Project Description */}
      <div className="mb-10 pb-8 border-b border-slate-700">
        <p className="text-gray-300 text-lg leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Step-by-Step Guide */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-8">Step-by-Step Development Guide</h2>
        <div className="space-y-8">
          {plan.steps?.map((step, idx) => (
            <div key={idx} className="flex gap-6">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number || idx + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                {/* Step Title and Description */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Tool Box */}
                {step.tool && (
                  <a
                    href={step.tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-700/50 border-2 border-slate-600 hover:border-purple-500 hover:bg-slate-700 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xl font-bold text-purple-300 hover:text-purple-200 transition-colors">
                        {step.tool.name}
                      </h4>
                      <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.tool.description}
                    </p>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Tool Grid Component
function ToolGrid({ tools }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-white mb-8">
        <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
          All Available AI Tools
        </span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <a
            key={idx}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-800 border border-slate-700 hover:border-blue-500 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 cursor-pointer"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-400 mb-3 inline-block bg-gray-700/50 px-2 py-1 rounded">
              {tool.category}
            </p>
            <p className="text-gray-300 text-sm">{tool.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

// Error State Component
function ErrorMessage({ message, onDismiss }) {
  const isBillingError = message.includes('quota') || message.includes('billing') || message.includes('insufficient')
  
  return (
    <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 mb-8 flex items-start gap-4">
      <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="text-red-300 font-bold mb-1">
          {isBillingError ? 'OpenAI Account Issue' : 'Error'}
        </h3>
        <p className="text-red-200 text-sm mb-3">{message}</p>
        {isBillingError && (
          <a
            href="https://platform.openai.com/account/billing/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded text-sm transition-colors"
          >
            Fix Billing →
          </a>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-red-300 hover:text-red-200 font-bold flex-shrink-0"
      >
        ✕
      </button>
    </div>
  )
}

export default function AITools() {
  const [plan, setPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const tools = [
    {
      name: 'ChatGPT',
      description: 'Advanced language model for natural language processing and conversational AI.',
      url: 'https://openai.com/chatgpt',
      category: 'Language Models',
    },
    {
      name: 'TensorFlow',
      description: 'Open-source machine learning framework for building neural networks.',
      url: 'https://www.tensorflow.org',
      category: 'ML Framework',
    },
    {
      name: 'PyTorch',
      description: 'Deep learning framework with a focus on flexibility and dynamic computation graphs.',
      url: 'https://pytorch.org',
      category: 'ML Framework',
    },
    {
      name: 'Scikit-learn',
      description: 'Python library for machine learning with simple and efficient tools.',
      url: 'https://scikit-learn.org',
      category: 'ML Library',
    },
    {
      name: 'Hugging Face',
      description: 'Hub for pre-trained models and tools for NLP, computer vision, and more.',
      url: 'https://huggingface.co',
      category: 'Model Hub',
    },
    {
      name: 'GitHub Copilot',
      description: 'AI-powered code assistant that helps you write better code faster.',
      url: 'https://github.com/features/copilot',
      category: 'Code Tools',
    },
    {
      name: 'OpenAI API',
      description: 'Access to powerful language models via API for custom applications.',
      url: 'https://openai.com/api',
      category: 'API',
    },
    {
      name: 'Google Colab',
      description: 'Free Jupyter notebook environment for machine learning and data analysis.',
      url: 'https://colab.research.google.com',
      category: 'Development',
    },
    {
      name: 'Streamlit',
      description: 'Turn Python scripts into interactive web apps with minimal code.',
      url: 'https://streamlit.io',
      category: 'Web Framework',
    },
  ]

  const handleGeneratePlan = async (idea) => {
    setIsLoading(true)
    setError(null)
    setPlan(null)

    try {
      const result = await generateProjectPlan(idea)
      setPlan(result)
    } catch (err) {
      setError(err.message || 'Failed to generate project plan. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 min-h-screen pt-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              AI Tools & Resources
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore AI tools and get personalized project recommendations powered by AI.
          </p>
        </div>

        {/* Project Idea Form */}
        <ProjectIdeaForm onGenerate={handleGeneratePlan} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        )}

        {/* Project Plan */}
        {plan && <ProjectPlan plan={plan} />}

        {/* Empty State Tip */}
        {!plan && !isLoading && (
          <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 mb-12 text-center">
            <p className="text-gray-300">
              💡 <strong>Tip:</strong> Describe a project idea above to get AI-powered recommendations tailored to your project!
            </p>
          </div>
        )}

        {/* Tools Grid */}
        <ToolGrid tools={tools} />

        {/* Getting Started Section */}
        <section className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">→</span>
              <span>Start with beginner-friendly tools like ChatGPT to understand AI capabilities</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">→</span>
              <span>Learn programming with Python and explore ML frameworks like TensorFlow or PyTorch</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">→</span>
              <span>Build projects and apply AI concepts to real-world business problems</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">→</span>
              <span>Join our club to collaborate and share your AI projects with the community</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
