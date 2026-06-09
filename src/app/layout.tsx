import type { Metadata, Viewport } from 'next'
import './globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'Atlas Anatômico Veterinário · Bovinos',
  description:
    'Atlas Anatômico Veterinário de Bovinos — Série Pokémon. Morfofisiologia do Aparelho Neurolocomotor e Tegumento dos Animais · Medicina Veterinária · Unisociesc Blumenau.',
  keywords: [
    'atlas anatômico',
    'veterinária',
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
    title: 'Atlas Anatômico Veterinário · Bovinos',
    description: '328 cards estilo Pokémon de anatomia bovina.',
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
