import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface PageShellProps {
  title: string
  subtitle?: ReactNode
  breadcrumb?: ReactNode
  children: ReactNode
}

export default function PageShell({ title, subtitle, breadcrumb, children }: PageShellProps) {
  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen">
        <div className="px-4 sm:px-6 pb-12">
          <div className="max-w-7xl mx-auto py-8 space-y-3">
            {breadcrumb}
            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient">
                {title}
              </h1>
              {subtitle && <p className="text-gray-500 dark:text-white/60 text-sm">{subtitle}</p>}
            </div>
          </div>
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
