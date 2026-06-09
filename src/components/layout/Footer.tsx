export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-dark-800/30 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <p className="text-gray-800 dark:text-white/80 font-display font-semibold text-base">
              Atlas Anatômico Veterinário · Bovinos
            </p>
            <p className="text-gray-500 dark:text-white/60 text-sm">
              Medicina Veterinária · Unisociesc Blumenau
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-0.5">
            <p className="text-gray-500 dark:text-white/60 text-sm">
              Isabella · Ariane · Amanda · Alexandra
            </p>
            <p className="text-gray-400 dark:text-white/50 text-xs">
              Prof. Alessandra de Moraes Sousa · Prof. Julia Cristina Alves
            </p>
            <a
              href="https://github.com/isadfrn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-white/50 text-xs hover:text-gray-600 dark:hover:text-white/75 transition-colors mt-1"
            >
              Desenvolvido por @isadfrn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
