import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The legal pages render the Markdown drafts in ../docs, which sit outside the client root.
    fs: { allow: ['..'] },
  },
})
