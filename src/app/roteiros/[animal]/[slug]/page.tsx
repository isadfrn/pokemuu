import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import RoteiroClient from '@/components/features/roteiros/RoteiroClient'
import { roteirosHubHref, roteirosHref } from '@/domain/assets'
import { getAvailableAnimal, getAvailableAnimals } from '@/services/animalService'
import { getRoadmap, getRoadmapsForAnimal } from '@/services/roadmapService'

interface RoteiroDetailPageProps {
  params: { animal: string; slug: string }
}

export function generateStaticParams() {
  return getAvailableAnimals().flatMap((animal) =>
    getRoadmapsForAnimal(animal.id).map((roadmap) => ({
      animal: animal.id,
      slug: roadmap.slug,
    })),
  )
}

export function generateMetadata({ params }: RoteiroDetailPageProps) {
  const roadmap = getRoadmap(params.slug)
  if (!roadmap) return {}
  return {
    title: `${roadmap.title} · Roteiro · Pokémuu`,
    description: roadmap.description,
  }
}

export default function RoteiroDetailPage({ params }: RoteiroDetailPageProps) {
  const animal = getAvailableAnimal(params.animal)
  const roadmap = getRoadmap(params.slug)
  if (!animal || !roadmap || !roadmap.animals.includes(animal.id)) notFound()

  const breadcrumb = (
    <nav className="text-xs text-gray-400 dark:text-white/40 flex items-center gap-1.5 flex-wrap">
      <Link href={roteirosHubHref} className="hover:text-gold-400 transition-colors">
        Roteiros
      </Link>
      <span>/</span>
      <Link href={roteirosHref(animal.id)} className="hover:text-gold-400 transition-colors">
        {animal.name}
      </Link>
      <span>/</span>
      <span className="text-gray-600 dark:text-white/60">{roadmap.title}</span>
    </nav>
  )

  return (
    <PageShell
      title={roadmap.title}
      subtitle={`${roadmap.description} · ${roadmap.resolvedCards.length} cards`}
      breadcrumb={breadcrumb}
    >
      <RoteiroClient cards={roadmap.resolvedCards} />
    </PageShell>
  )
}
