# AI in Business Club — Indiana University

Official website for the AI in Business (AIB) Club at Indiana University. Built with React + Vite + Tailwind CSS.

## Features

- **Home** — Club overview, mission, and executive board
- **AI Tools** — Browse curated AI tools and generate a personalized project plan powered by Google Gemini
- **Contact** — Validated contact form via EmailJS, plus links to BeInvolved, LinkedIn, and Instagram

## Tech Stack

- [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [EmailJS](https://www.emailjs.com/) — contact form delivery
- [Google Gemini API](https://aistudio.google.com/) — AI project plan generation
- [Lucide React](https://lucide.dev/) — icons

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/kubaman1000/AIBWebsite.git
cd AIBWebsite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id_here
```

**Where to get keys:**
- **Gemini API key** → [Google AI Studio](https://aistudio.google.com/app/apikeys)
- **EmailJS keys** → [EmailJS Dashboard](https://dashboard.emailjs.com/) (Public Key, Service ID, Template ID)

> Never commit `.env.local` to git. It is already listed in `.gitignore`.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Environment Variables

All sensitive config lives in `.env.local` (gitignored). Vite exposes only variables prefixed with `VITE_` to the client bundle.

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI project planner |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |

## Deployment

See the **Vercel** section below. A `vercel.json` is included that handles SPA routing and security headers automatically.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   └── Loading.jsx
├── pages/
│   ├── Home.jsx
│   ├── AITools.jsx
│   └── Contact.jsx
├── prompts/
│   └── systemPrompt.js
├── config/
│   └── emailConfig.js
├── App.jsx
└── main.jsx
public/          # Static assets (images, favicon)
vercel.json      # Vercel routing + security headers
.env.example     # Template for environment variables
```
