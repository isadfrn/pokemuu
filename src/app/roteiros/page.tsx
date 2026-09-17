import PageShell from '@/components/layout/PageShell'
import AnimalPicker from '@/components/features/animals/AnimalPicker'
import { buildAnimalPickerItems } from '@/services/animalPicker'
import { getAvailableAnimals } from '@/services/animalService'

export const metadata = {
  title: 'Roteiros · Escolha o animal · Pokémuu',
  description:
    'Escolha um animal para ver seus roteiros de estudo com cards selecionados por tema.',
}

export default function RoadmapsHubPage() {
  const items = buildAnimalPickerItems('roadmaps')
  const available = getAvailableAnimals().length

  return (
    <PageShell
      title="Roteiros de Estudo"
      subtitle={`Escolha um animal · ${available} disponível${available === 1 ? '' : 'is'}`}
    >
      <AnimalPicker items={items} />
    </PageShell>
  )
}
