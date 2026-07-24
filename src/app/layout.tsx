import type { Metadata, Viewport } from 'next'
import './globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'Pokémuu · Atlas Anatômico Veterinário',
  description:
    'Pokémuu — Atlas Anatômico Veterinário em cards estilo Pokémon. Anatomia de múltiplos animais, começando pelos bovinos · Medicina Veterinária · Unisociesc Blumenau.',
  keywords: [
    'atlas anatômico',
    'veterinária',
    'anatomia animal',
    'bovinos',
    'morfofisiologia',
    'músculos',
    'ossos',
    'articulações',
    'Unisociesc',
  ],
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Pokémuu · Atlas Anatômico Veterinário',
    description: 'Cards estilo Pokémon de anatomia veterinária, começando pelos bovinos.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-dark-900 dark:text-white antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
