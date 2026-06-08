'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const HERO_CARDS = [1, 75, 150, 200, 300]

const cardTransforms = [
  { rotate: -16, x: -110, y: 18, delay: 0.05, zIndex: 1, scale: 0.8 },
  { rotate: -7,  x: -55,  y: 6,  delay: 0.12, zIndex: 2, scale: 0.9 },
  { rotate: 0,   x: 0,    y: 0,  delay: 0.2,  zIndex: 5, scale: 1   },
  { rotate: 7,   x: 55,   y: 6,  delay: 0.12, zIndex: 2, scale: 0.9 },
  { rotate: 16,  x: 110,  y: 18, delay: 0.05, zIndex: 1, scale: 0.8 },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(20,16,30,0.9)_0%,_transparent_100%)]" />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 px-4 text-center max-w-3xl mx-auto w-full">
        {/* Card fan */}
        <div className="relative h-56 sm:h-64 w-full max-w-md flex items-center justify-center">
          {HERO_CARDS.map((id, i) => {
            const t = cardTransforms[i]
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: t.y }}
                transition={{ duration: 0.55, delay: t.delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: t.y - 10, zIndex: 10, transition: { duration: 0.2 } }}
                style={{
                  position: 'absolute',
                  rotate: t.rotate,
                  x: t.x,
                  scale: t.scale,
                  zIndex: t.zIndex,
                }}
                className="origin-bottom cursor-pointer"
              >
                <div className="w-28 sm:w-32 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src={`/cards/${id}.webp`}
                    alt={`Card ${id}`}
                    width={180}
                    height={252}
                    className="w-full h-auto"
                    priority={i === 2}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-medium tracking-widest uppercase">
            328 cards · Série Pokémon
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white">
            Atlas Anatômico
            <br />
            <span className="text-gold-gradient">Veterinário</span>
          </h1>

          <p className="text-white/45 text-base sm:text-lg font-light max-w-md mx-auto leading-relaxed">
            Bovinos · Morfofisiologia do Aparelho<br className="hidden sm:block" /> Neurolocomotor e Tegumento
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/atlas"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gold-500/20"
          >
            Explorar o Atlas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
          <Link
            href="#sobre"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white/50 hover:text-white/80 text-sm font-medium transition-colors"
          >
            Sobre o projeto
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/15"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
