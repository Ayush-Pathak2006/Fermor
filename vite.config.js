import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Screenshots and audit files are written into the project folder. Do not reload for them.
    watch: { ignored: ['**/screenshots/**', '**/.audit/**'] },
  },
  test: {
    // Unit tests cover the pure logic in src/lib. Files that need a DOM opt in with a
    // "// @vitest-environment jsdom" comment, so the rest run fast in plain Node.
    include: ['src/**/*.test.{js,jsx}'],
  },
})
