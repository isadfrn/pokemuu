export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-800/30 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <p className="text-white/70 font-display font-semibold text-sm">
              Atlas Anatômico Veterinário · Bovinos
            </p>
            <p className="text-white/30 text-xs">
              Medicina Veterinária · Unisociesc Blumenau
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-0.5">
            <p className="text-white/25 text-xs">
              Isabella · Ariane · Amanda · Alexandra
            </p>
            <p className="text-white/15 text-[11px]">
              Prof. Alessandra de Moraes Sousa · Prof. Julia Cristina Alves
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
