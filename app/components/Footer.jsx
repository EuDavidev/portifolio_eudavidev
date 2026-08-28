'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Mail, Github, Linkedin, Instagram, SunLight, CloudSunny, HalfMoon, Check } from 'iconoir-react'

const EMAIL = 'davisouza128@gmail.com'

const STACK_PILLS = ['Next.js', 'React', 'Tailwind', 'Framer Motion']

const QUOTES = [
  '"Simplicidade é a sofisticação suprema." — Leonardo da Vinci',
  '"O design é a inteligência tornada visível." — Alina Wheeler',
  '"Primeiro resolva o problema, depois escreva o código." — John Johnson',
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return { text: 'Bom dia', icon: <SunLight className="w-4 h-4 text-yellow-400" /> }
  if (h < 18) return { text: 'Boa tarde', icon: <CloudSunny className="w-4 h-4 text-orange-400" /> }
  return { text: 'Boa noite', icon: <HalfMoon className="w-4 h-4 text-indigo-400" /> }
}

export const Footer = ({ isDarkMode }) => {
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()
  const [greeting, setGreeting] = useState({ text: '', icon: null })
  const [time, setTime] = useState('')
  const [quoteIdx, setQuoteIdx] = useState(0)

  useEffect(() => {
    setGreeting(getGreeting())
    const fmt = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit', minute: '2-digit',
      timeZone: 'America/Bahia',
    })
    const tick = () => {
      setTime(fmt.format(new Date()))
      setGreeting(getGreeting())
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % QUOTES.length)
    }, 8000)
    return () => clearInterval(id)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard indisponível */ }
  }

  const year = new Date().getFullYear()

  return (
    <footer className='mt-20 font-sora'>
      {/* Main footer content */}
      <div className='max-w-5xl mx-auto px-5 sm:px-8 lg:px-[12%] pb-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-black/5 dark:border-white/5'>
          {/* Col 1 — Logo + greeting */}
          <div>
            <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='Logo DaviDev' className='w-32 mb-4' />
            <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
              <span>{greeting.icon}</span>
              <span>{greeting.text}</span>
              {time && <span className='text-xs tabular-nums'>— {time}</span>}
            </div>
          </div>

          {/* Col 2 — Contact */}
          <div>
            <h4 className='font-sora text-sm mb-3'>Contato</h4>
            <button
              onClick={copyEmail}
              aria-label={`Copiar e-mail ${EMAIL}`}
              className='relative flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#FF803B] transition-colors duration-300 cursor-pointer'
            >
              <Mail className="w-4 h-4 text-[#FF803B]" />
              {EMAIL}
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                    transition={{ duration: reduced ? 0.15 : 0.25 }}
                    className='absolute -top-8 left-0 bg-black text-white text-xs rounded-lg px-3 py-1 whitespace-nowrap flex items-center gap-1'
                  >
                    <Check className="w-3 h-3 text-green-400" /> Copiado!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <div className='flex flex-wrap items-center gap-4 mt-4'>
              {[
                { href: 'https://github.com/EuDavidev/', label: 'GitHub', icon: <Github className="w-4 h-4" /> },
                { href: 'https://www.linkedin.com/in/davi-souza-075540309/', label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
                { href: 'https://www.instagram.com/eudavidev/', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-[#FF803B] transition-colors duration-300'
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 — Made with */}
          <div>
            <h4 className='font-sora text-sm mb-3'>Feito com</h4>
            <div className='flex flex-wrap gap-2'>
              {STACK_PILLS.map((tech) => (
                <span key={tech} className='text-xs px-3 py-1 rounded-full border border-[#FF803B]/20 text-[#FF803B] bg-[#FF803B]/5'>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='flex flex-col sm:flex-row items-center justify-between pt-6 gap-4 text-xs text-gray-400'>
          <p>© {year} Davi Souza. Todos os direitos reservados.</p>

          {/* Rotating quote */}
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.5 }}
              className='text-center text-gray-400/70 italic max-w-xs sm:max-w-sm'
            >
              {QUOTES[quoteIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </footer>
  )
}
export default Footer
