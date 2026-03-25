import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ensure Vite serves assets from the root path.
  // Important for client-side routes on platforms like Vercel.
  base: '/',
})