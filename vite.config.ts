import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Lar `npm run dev` kjøre api/recommend.ts, som ellers bare kjører på Vercel.
function devApi(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/recommend', async (req, res) => {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk)

        const { POST } = await server.ssrLoadModule('/api/recommend.ts')
        const response: Response = await POST(
          new Request(`http://localhost${req.originalUrl}`, {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
          })
        )

        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(await response.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Gjør ANTHROPIC_API_KEY fra .env.local tilgjengelig for api/-koden.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), devApi()],
  }
})
