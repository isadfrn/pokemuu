import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import AtlasClient from '@/components/features/atlas/AtlasClient'
import { atlasHubHref } from '@/domain/assets'
import { getAvailableAnimal, getAvailableAnimals } from '@/services/animalService'
import { getCards } from '@/services/cardService'

interface AtlasAnimalPageProps {
  params: { animal: string }
}

export function generateStaticParams() {
  return getAvailableAnimals().map((a) => ({ animal: a.id }))
}

export function generateMetadata({ params }: AtlasAnimalPageProps) {
  const animal = getAvailableAnimal(params.animal)
  if (!animal) return {}
  return {
    title: `Atlas · ${animal.name} · Pokémuu`,
    description: `${getCards(animal.id).length} cards de anatomia ${animal.name.toLowerCase()} em cards estilo Pokémon.`,
  }
}

export default function AtlasAnimalPage({ params }: AtlasAnimalPageProps) {
  const animal = getAvailableAnimal(params.animal)
  if (!animal) notFound()

  const cards = getCards(animal.id)

  const breadcrumb = (
    <nav className="text-xs text-gray-400 dark:text-white/40 flex items-center gap-1.5">
      <Link href={atlasHubHref} className="hover:text-gold-400 transition-colors">
        Atlas
      </Link>
      <span>/</span>
      <span className="text-gray-600 dark:text-white/60">{animal.name}</span>
    </nav>
  )

  return (
    <PageShell
      title={`Atlas · ${animal.name}`}
      subtitle={`${cards.length} cards · ${animal.emoji} ${animal.name} · Série Pokémon`}
      breadcrumb={breadcrumb}
    >
      <Suspense>
        <AtlasClient animal={animal} cards={cards} />
      </Suspense>
    </PageShell>
  )
}
