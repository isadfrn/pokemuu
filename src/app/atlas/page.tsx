import PageShell from '@/components/layout/PageShell'
import AnimalPicker from '@/components/features/animals/AnimalPicker'
import { buildAnimalPickerItems } from '@/services/animalPicker'
import { getAvailableAnimals } from '@/services/animalService'

export const metadata = {
  title: 'Atlas - Pokémuu',
  description: 'Escolha um animal para explorar sua anatomia em cards no estilo Pokémon TCG.',
}

export default function AtlasHubPage() {
  const items = buildAnimalPickerItems('atlas')
  const available = getAvailableAnimals().length

  return (
    <PageShell
      title="Atlas Anatômico"
      subtitle={`Escolha um animal · ${available} disponível${available === 1 ? '' : 'is'}`}
    >
      <AnimalPicker items={items} />
    </PageShell>
  )
}
