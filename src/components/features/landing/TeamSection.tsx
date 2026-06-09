'use client'

import { motion } from 'framer-motion'

const STUDENTS = ['Isabella', 'Ariane', 'Amanda', 'Alexandra']
const PROFESSORS = ['Alessandra de Moraes Sousa', 'Julia Cristina Alves']

function FadeUp({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function TeamSection() {
  return (
    <section id="sobre" className="py-24 px-4 sm:px-6 bg-gray-50 dark:bg-dark-800/30">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* Course header */}
        <FadeUp delay={0}>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase">
              Medicina Veterinária · Unisociesc · Blumenau
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white leading-snug">
              Morfofisiologia do Aparelho<br />Neurolocomotor e Tegumento
            </h2>
            <p className="text-gray-600 dark:text-white/65 text-sm leading-relaxed">
              Atlas desenvolvido como material didático para a disciplina.<br />328 cards de anatomia bovina no estilo Pokémon Trading Card Game.
            </p>
          </div>
        </FadeUp>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
          <span className="text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase">Equipe</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* Students */}
          <FadeUp delay={0.05}>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-gray-500 dark:text-white/55 text-[11px] font-medium tracking-[0.18em] uppercase">
                  Desenvolvido por
                </p>
                <p className="text-gray-900 dark:text-white font-semibold text-lg">Alunas</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {STUDENTS.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                    className="flex items-center gap-3 bg-white dark:bg-dark-700/60 border border-gray-200 dark:border-white/6 rounded-xl px-3.5 py-3 hover:border-gold-500/30 hover:bg-gray-50 dark:hover:bg-dark-700 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold-500/8 border border-gold-500/15 flex items-center justify-center text-gold-400 text-sm font-semibold flex-shrink-0 group-hover:bg-gold-500/15 transition-colors">
                      {name[0]}
                    </div>
                    <span className="text-gray-800 dark:text-white/90 text-sm font-medium">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Professors */}
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-gray-500 dark:text-white/55 text-[11px] font-medium tracking-[0.18em] uppercase">
                  Orientação acadêmica
                </p>
                <p className="text-gray-900 dark:text-white font-semibold text-lg">Professoras</p>
              </div>
              <div className="space-y-2.5">
                {PROFESSORS.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                    className="flex items-center gap-3 bg-white dark:bg-dark-700/60 border border-gray-200 dark:border-white/6 rounded-xl px-4 py-3.5 hover:border-gold-500/30 hover:bg-gray-50 dark:hover:bg-dark-700 transition-all"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold-500/60 flex-shrink-0" />
                    <span className="text-gray-800 dark:text-white/90 text-sm">{name}</span>
                  </motion.div>
                ))}
              </div>

              {/* University badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-gold-500/15 bg-gold-500/5"
              >
                <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center">
                  <span className="text-gold-400 text-xs font-bold">U</span>
                </div>
                <div>
                  <p className="text-gold-400 font-semibold text-sm">Unisociesc</p>
                  <p className="text-gray-500 dark:text-white/60 text-[11px]">Centro Universitário Sociesc · Blumenau</p>
                </div>
              </motion.div>
            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  )
}
