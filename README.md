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
