import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allows connections from any IP on the network
    port: 5173,       // Use your desired port (5173 is the default for Vite)
    strictPort: true, // Ensure the server only starts on the given port
  }
})
