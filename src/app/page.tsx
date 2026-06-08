import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/features/landing/Hero'
import TeamSection from '@/components/features/landing/TeamSection'
import CategoryPreview from '@/components/features/landing/CategoryPreview'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TeamSection />
        <CategoryPreview />
      </main>
      <Footer />
    </>
  )
}
