'use client'
import { assets, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReveal } from './motionPresets'
import { Code, GraduationCap, Folder, Copy, Check, Clock } from 'iconoir-react'

const EMAIL = 'davisouza128@gmail.com'

const INFO_ITEMS = [
    {
        icon: <Code className="w-4 h-4 text-[#FF803B]" />,
        title: 'Linguagens',
        description: 'TypeScript, JavaScript, Java, Python, Go.'
    },
    {
        icon: <GraduationCap className="w-4 h-4 text-[#FF803B]" />,
        title: 'Educação',
        description: 'UNINTER - Bacharelado em Engenharia de Software'
    },
    {
        icon: <Folder className="w-4 h-4 text-[#FF803B]" />,
        title: 'Projetos',
        description: 'Mais de 10 projetos full stack construídos.'
    }
]

const LocalClock = () => {
    const [time, setTime] = useState('')

    useEffect(() => {
        const fmt = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'America/Bahia',
        })
        const tick = () => setTime(fmt.format(new Date()))
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    return (
        <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4 text-[#FF803B]' />
            <span className='font-sora text-2xl tabular-nums'>{time}</span>
        </div>
    )
}

// Mini code block that looks like real code (transmits authenticity, inspired by Jason)
const CodeBlock = () => (
    <div className='rounded-xl bg-[#1E1E1E] p-4 text-xs font-mono text-left overflow-hidden select-none'>
        <div className='flex items-center gap-1.5 mb-3'>
            <div className='w-2.5 h-2.5 rounded-full bg-red-500/70' />
            <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/70' />
            <div className='w-2.5 h-2.5 rounded-full bg-green-500/70' />
            <span className='ml-2 text-gray-500 text-[10px]'>page.js</span>
        </div>
        <div className='space-y-0.5 text-[11px] leading-5'>
            <p><span className='text-purple-400'>import</span> <span className='text-blue-300'>React</span> <span className='text-purple-400'>from</span> <span className='text-green-400'>&apos;react&apos;</span></p>
            <p><span className='text-purple-400'>import</span> {'{'} <span className='text-blue-300'>motion</span> {'}'} <span className='text-purple-400'>from</span> <span className='text-green-400'>&apos;motion/react&apos;</span></p>
            <p className='text-gray-600'>{'// DaviDev Portfolio'}</p>
            <p><span className='text-purple-400'>export default function</span> <span className='text-yellow-300'>Home</span><span className='text-gray-400'>() {'{'}</span></p>
            <p className='pl-4'><span className='text-purple-400'>return</span> <span className='text-gray-400'>(</span></p>
            <p className='pl-8'><span className='text-blue-300'>{'<main>'}</span></p>
            <p className='pl-12 text-[#FF803B]'>{'<Hero />'}</p>
            <p className='pl-12 text-[#FF803B]'>{'<Projects />'}</p>
            <p className='pl-8'><span className='text-blue-300'>{'</main>'}</span></p>
            <p className='pl-4'><span className='text-gray-400'>)</span></p>
            <p><span className='text-gray-400'>{'}'}</span></p>
        </div>
    </div>
)

export const About = ({ isDarkMode }) => {
    const { section, item, viewport, reduced } = useReveal()
    const [copied, setCopied] = useState(false)

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            // clipboard indisponível
        }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={section}
            id='about' className='w-full px-5 sm:px-8 lg:px-[12%] py-10 scroll-mt-20'>

            <motion.div variants={item} className='text-center mb-2'>
                <span className='section-eyebrow'>Introdução</span>
            </motion.div>
            <motion.h2 variants={item} className='text-center text-4xl sm:text-5xl font-sora mb-14'>Sobre mim</motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto font-sora'>

                {/* Bio — bloco grande */}
                <motion.div variants={item} className='premium-card md:col-span-2 lg:row-span-2 p-6 flex flex-col sm:flex-row items-center gap-8'>
                    <Image src={assets.user_image} alt='Foto de Davi Souza' className='w-40 sm:w-48 rounded-2xl' />
                    <div>
                        <p className='font-sora text-gray-600 dark:text-gray-400 leading-relaxed'>
                            Sou um Full Stack Developer brasileiro apaixonado por tecnologia e inovação, criando experiências digitais que combinam funcionalidade impecável e design marcante. Com um toque brasileiro de criatividade, transformo ideias em soluções de impacto.
                        </p>
                        <ul className='mt-6 space-y-3 text-sm'>
                            {INFO_ITEMS.map(({ icon, title, description }, index) => (
                                <li key={index} className='flex items-start gap-3'>
                                    <div className='w-8 h-8 rounded-lg bg-[#FF803B]/10 flex items-center justify-center flex-shrink-0'>
                                        {icon}
                                    </div>
                                    <span className='font-semibold whitespace-nowrap'>{title}:</span>
                                    <span className='text-gray-500 dark:text-gray-400'>{description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Code block */}
                <motion.div variants={item} className='premium-card p-4 overflow-hidden'>
                    <CodeBlock />
                </motion.div>

                {/* Ferramentas */}
                <motion.div variants={item} className='premium-card p-6'>
                    <h3 className='font-semibold mb-4 text-sm'>Ferramentas</h3>
                    <ul className='flex flex-wrap items-center gap-3'>
                        {toolsData.map((tool, index) => (
                            <li key={index} className='group relative flex items-center justify-center w-12 aspect-square rounded-xl bg-black/3 dark:bg-white/5 border border-transparent hover:border-[#FF803B]/30 transition-all duration-300 hover:-translate-y-1'>
                                <Image src={tool.icon} alt={tool.name} className='w-6' />
                                <span className='pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1E1E1E] text-white text-xs rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                                    {tool.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Disponibilidade / fuso */}
                <motion.div variants={item} className='premium-card p-6'>
                    <h3 className='font-semibold mb-2 text-sm'>Disponibilidade</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mb-3'>Bahia, Brasil (GMT-3)</p>
                    <LocalClock />
                    <div className='flex items-center gap-2 mt-3'>
                        <span className='pulse-dot' />
                        <p className='text-sm text-green-600 dark:text-green-400 font-medium'>Disponível para novos projetos</p>
                    </div>
                </motion.div>

                {/* CTA laranja — copiar e-mail */}
                <motion.button
                    variants={item}
                    onClick={copyEmail}
                    aria-label={`Copiar e-mail ${EMAIL}`}
                    className='relative rounded-2xl p-6 bg-gradient-to-br from-[#FF803B] to-[#FF6A1A] text-white text-left font-sora lg:col-span-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF803B]/25 cursor-pointer'
                >
                    <h3 className='font-sora text-lg'>Vamos conversar?</h3>
                    <p className='text-sm opacity-90 mt-1'>{EMAIL}</p>
                    <p className='text-xs opacity-70 mt-4 flex items-center gap-1.5'>
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        Clique para copiar
                    </p>
                    <AnimatePresence>
                        {copied && (
                            <motion.span
                                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                                transition={{ duration: reduced ? 0.15 : 0.25 }}
                                className='absolute top-4 right-4 bg-black text-white text-xs rounded-lg px-3 py-1 flex items-center gap-1'
                            >
                                <Check className="w-3 h-3 text-green-400" /> Copiado!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default About
