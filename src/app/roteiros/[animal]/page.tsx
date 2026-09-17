import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import RoadmapsList from '@/components/features/roadmaps/RoadmapsList'
import { roadmapsHubHref } from '@/domain/assets'
import { getAvailableAnimal, getAvailableAnimals } from '@/services/animalService'
import { getRoadmapsForAnimal } from '@/services/roadmapService'

interface RoadmapsAnimalPageProps {
  params: { animal: string }
}

export function generateStaticParams() {
  return getAvailableAnimals().map((a) => ({ animal: a.id }))
}

export function generateMetadata({ params }: RoadmapsAnimalPageProps) {
  const animal = getAvailableAnimal(params.animal)
  if (!animal) return {}
  return {
    title: `Roteiros · ${animal.name} · Pokémuu`,
    description: `Roteiros de estudo de anatomia ${animal.name.toLowerCase()} com cards selecionados por tema.`,
  }
}

export default function RoadmapsAnimalPage({ params }: RoadmapsAnimalPageProps) {
  const animal = getAvailableAnimal(params.animal)
  if (!animal) notFound()

  const roadmaps = getRoadmapsForAnimal(animal.id)

  const breadcrumb = (
    <nav className="text-xs text-gray-400 dark:text-white/40 flex items-center gap-1.5">
      <Link href={roadmapsHubHref} className="hover:text-gold-400 transition-colors">
        Roteiros
      </Link>
      <span>/</span>
      <span className="text-gray-600 dark:text-white/60">{animal.name}</span>
    </nav>
  )

  return (
    <PageShell
      title={`Roteiros · ${animal.name}`}
      subtitle={`${roadmaps.length} roteiro${roadmaps.length === 1 ? '' : 's'} · ${animal.emoji} ${animal.name}`}
      breadcrumb={breadcrumb}
    >
      <RoadmapsList animal={animal} roadmaps={roadmaps} />
    </PageShell>
  )
}
