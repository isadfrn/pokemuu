import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const resolvePath = (relative: string) => fileURLToPath(new URL(relative, import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolvePath('./src'),
      // Framework modules are replaced with lightweight stubs so component tests can
      // render in jsdom without pulling Next's runtime or animation engine.
      'next/image': resolvePath('./src/test/stubs/next-image.tsx'),
      'next/link': resolvePath('./src/test/stubs/next-link.tsx'),
      'next/navigation': resolvePath('./src/test/stubs/next-navigation.ts'),
      'framer-motion': resolvePath('./src/test/stubs/framer-motion.tsx'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/test/**', 'src/app/globals.css'],
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 80,
        lines: 85,
      },
    },
  },
})
