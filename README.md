# 🌸 Din Blomst

A modern, accessible website for a fictional, family-run flower shop, with an AI assistant that recommends bouquets.

🔗 **Live demo:** [din-blomst.vercel.app](https://din-blomst.vercel.app)

<img width="700" height="700" alt="Skjermbilde 2026-10-25 232042" src="https://github.com/user-attachments/assets/2d541483-b395-484a-ac36-f27ee4c1ccaa" />


## About the project

Din Blomst is a responsive web shop with multiple pages, a product catalog and a working shopping cart. Customers can describe what they need in their own words, such as occasion, recipient, colors or budget, and an AI assistant powered by the **Claude API** suggests up to three matching bouquets from the catalog, each with a short explanation.

The AI runs in a serverless function on Vercel, so the API key never reaches the browser. If the AI is unavailable, the assistant falls back to keyword matching, so the feature always works.

### Features

- 🤖 **AI assistant:** Personalized bouquet recommendations based on occasion, recipient and budget
- 🏠 Home page with a hero section and quick suggestions (e.g. "Birthday", "For mom", "Under 300 kr")
- 📖 About page telling the shop's story
- 🌷 Product catalog
- 🛒 Shopping cart with quantity controls and order confirmation
- ♿ Built with accessibility in mind (ARIA labels, keyboard navigation, color contrast)
- 📱 Responsive design for mobile and desktop

## Tech stack

- **React**: component-based UI
- **TypeScript**: type safety across the app
- **Tailwind CSS**: utility-first styling
- **React Router**: client-side routing between pages
- **Claude API** (Anthropic): AI recommendations with structured JSON output
- **Vercel Serverless Functions**: secure backend for the AI requests
- **Vite**: fast build tool and dev server
- Deployed on **Vercel**
