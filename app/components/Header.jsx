import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "motion/react"
import { Github, Linkedin, Instagram, ArrowDown, Download, Code, Terminal } from "iconoir-react"

const ROTATING_WORDS = [
  'interfaces modernas',
  'APIs robustas',
  'experiências digitais',
  'automações inteligentes',
]

const RotatingText = ({ reduced }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 2800)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom min-w-[240px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: reduced ? 0 : 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduced ? 0 : -28, opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 text-[#FF803B]"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const SOCIALS = [
  { href: 'https://github.com/EuDavidev/', label: 'GitHub', icon: <Github className="w-5 h-5" /> },
  { href: 'https://www.linkedin.com/in/davi-souza-075540309/', label: 'LinkedIn', icon: <Linkedin className="w-5 h-5" /> },
  { href: 'https://www.instagram.com/eudavidev/', label: 'Instagram', icon: <Instagram className="w-5 h-5" /> },
]

export const Header = ({ isDarkMode }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax layers
  const yText = useTransform(scrollYProgress, [0, 0.6], [0, reduced ? 0 : -80])
  const oText = useTransform(scrollYProgress, [0, 0.6], [1, 0.3])
  const yPhoto = useTransform(scrollYProgress, [0, 0.6], [0, reduced ? 0 : -40])
  const oPhoto = useTransform(scrollYProgress, [0, 0.6], [1, 0.6])

  return (
    <div ref={ref} id="top" className='w-11/12 max-w-6xl mx-auto min-h-screen flex items-center pt-20 pb-12 scroll-mt-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full'>

        {/* Left — Text Content */}
        <motion.div style={{ y: yText, opacity: oText }} className='order-2 lg:order-1'>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.2 : 0.5 }}
            className='section-eyebrow mb-6'
          >
            FULL STACK DEVELOPMENT
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.1 }}
            className='text-4xl sm:text-5xl lg:text-[56px] font-sora leading-[1.08] tracking-tight'
          >
            Olá, eu sou{' '}
            <span className='gradient-text-orange'>Davi Souza</span>
          </motion.h1>

          {/* Tagline with rotating words */}
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.25 }}
            className='text-lg sm:text-xl font-sora text-gray-600 dark:text-gray-400 mt-5 leading-relaxed'
          >
            Criando <RotatingText reduced={reduced} /> que transformam ideias em soluções de impacto.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.35 }}
            className='max-w-lg font-sora text-gray-500 dark:text-gray-400 mt-4 text-sm leading-relaxed'
          >
            Full Stack Developer brasileiro especializado em React, Next.js e TailwindCSS, com paixão por design intuitivo e performance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.45 }}
            className='flex flex-col sm:flex-row items-start gap-3 mt-8'
          >
            <a
              href="#work"
              className='px-8 py-3 rounded-xl bg-[#FF803B] text-white font-sora font-medium text-sm flex items-center gap-2 transition-all duration-300 hover:bg-[#FF6A1A] hover:shadow-lg hover:shadow-[#FF803B]/25 hover:-translate-y-0.5'
            >
              Ver Projetos
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="/sample-resume.pdf"
              download
              className='px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-sora font-medium text-sm flex items-center gap-2 transition-all duration-300 hover:border-[#FF803B] hover:text-[#FF803B] hover:-translate-y-0.5'
            >
              Baixar CV
              <Download className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.55 }}
            className='flex items-center gap-4 mt-10 pt-6 border-t border-black/5 dark:border-white/5'
          >
            <span className='text-xs text-gray-500 font-sora uppercase tracking-wider'>Conecte-se:</span>
            <div className='flex items-center gap-2'>
              {SOCIALS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#FF803B] hover:bg-[#FF803B]/10 transition-all duration-200'
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — Profile Photo & Dynamic Floating Elements */}
        <motion.div style={{ y: yPhoto, opacity: oPhoto }} className='order-1 lg:order-2 flex justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.2 : 0.7, delay: reduced ? 0 : 0.2 }}
            className='relative'
          >
            {/* Ambient glow behind photo */}
            <div className='absolute -inset-4 bg-gradient-to-tr from-[#FF803B]/20 via-[#FF803B]/5 to-transparent rounded-3xl blur-2xl pointer-events-none' />

            {/* Photo frame */}
            <div className='relative w-64 sm:w-72 md:w-80 aspect-square rounded-3xl overflow-hidden border-2 border-white/20 dark:border-white/10 shadow-2xl'>
              <Image
                src={assets.profile_img}
                alt='Foto de perfil Davi Souza'
                className='w-full h-full object-cover'
                priority
              />
              {/* Gradient overlay at bottom */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none' />
            </div>

            {/* Floating chip — top left */}
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.5 }}
              className='float-chip absolute -left-8 sm:-left-12 top-[15%] z-10 flex items-center gap-1.5'
            >
              <Code className='w-4 h-4 text-[#FF803B]' />
              React + Next.js
            </motion.div>

            {/* Floating chip — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.65 }}
              className='float-chip absolute -right-6 sm:-right-10 bottom-[20%] z-10 flex items-center gap-1.5'
            >
              <Terminal className='w-4 h-4 text-[#FF803B]' />
              Python + Node.js
            </motion.div>

            {/* Floating chip — top right */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.8 }}
              className='float-chip absolute -right-4 sm:-right-8 top-[5%] z-10'
            >
              <span className='text-green-500'>●</span>
              Full Stack Dev
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

export default Header
