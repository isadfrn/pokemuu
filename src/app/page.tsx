import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/features/landing/Hero'
import AnimalSection from '@/components/features/landing/AnimalSection'
import TeamSection from '@/components/features/landing/TeamSection'
import { cardImagePath } from '@/domain/assets'
import { getAvailableAnimals } from '@/services/animalService'
import { getCards } from '@/services/cardService'
import { buildAnimalPickerItems } from '@/services/animalPicker'

function heroPreviewImages(): string[] {
  const available = getAvailableAnimals()
  if (available.length === 0) return []
  const cards = getCards(available[0].id)
  if (cards.length === 0) return []
  const n = cards.length
  const indexes = [0, Math.floor(n * 0.25), Math.floor(n * 0.5), Math.floor(n * 0.75), n - 1]
  return indexes.map((i) => {
    const card = cards[Math.min(i, n - 1)]
    return cardImagePath(card.animal, card.id)
  })
}

export default function LandingPage() {
  const animalItems = buildAnimalPickerItems('atlas')
  const totalCards = getAvailableAnimals().reduce((sum, a) => sum + getCards(a.id).length, 0)

  return (
    <>
      <Header />
      <main>
        <Hero
          previewImages={heroPreviewImages()}
          totalCards={totalCards}
          animalCount={getAvailableAnimals().length}
        />
        <AnimalSection items={animalItems} />
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}
