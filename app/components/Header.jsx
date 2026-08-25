import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"

export const Header = ({ IsDarkMode }) => {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

    // Parallax em 3 camadas de profundidade (0 → 0.6 do scroll)
    const y1 = useTransform(scrollYProgress, [0, 0.6], [0, reduced ? 0 : -60])
    const o1 = useTransform(scrollYProgress, [0, 0.6], [1, 0.6])
    const y2 = useTransform(scrollYProgress, [0, 0.6], [0, reduced ? 0 : -120])
    const o2 = useTransform(scrollYProgress, [0, 0.6], [1, 0.3])
    const y3 = useTransform(scrollYProgress, [0, 0.6], [0, reduced ? 0 : -200])
    const o3 = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    return (
        <div ref={ref} className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 font-outfit'>

            <motion.div style={{ y: y1, opacity: o1 }}>
                <motion.div
                    initial={{ scale: 0 }}
                    viewport={{ once: true }} whileInView={{ scale: 1 }}
                    transition={{ duration: reduced ? 0.2 : 0.8, type: 'spring', stiffness: 100 }}
                >
                    <Image src={assets.profile_img} alt='Foto de perfil Davi Souza'
                        className='rounded-full w-32' />
                </motion.div>
                <motion.h3
                    initial={{ y: -20, opacity: 0 }}
                    viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.3 }}
                    className='flex items-end justify-center gap-2 text-xl md:text-2xl mb-3 mt-4 font-sora'>Olá! Eu sou Davi Souza <Image src={assets.hand_icon} alt='' className='w-6' /></motion.h3>
            </motion.div>

            <motion.h1
                style={{ y: y2, opacity: o2 }}
                initial={{ y: -30, opacity: 0 }}
                viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: reduced ? 0.2 : 0.8, delay: reduced ? 0 : 0.5 }}
                className='text-3xl sm:text-6xl lg:text-[66px] font-sora'>
                Full Stack Developer
            </motion.h1>

            <motion.div style={{ y: y3, opacity: o3 }} className='flex flex-col items-center gap-4'>
                <motion.p
                    initial={{ opacity: 0 }}
                    viewport={{ once: true }} whileInView={{ opacity: 1 }}
                    transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.7 }}
                    className='max-w-2xl mx-auto font-ovo'>
                    Sou um Full Stack Developer brasileiro especializado em criar interfaces modernas com React, Next.js e TailwindCSS. Com paixão por design intuitivo, transformo ideias em soluções digitais que engajam e performam.
                </motion.p>
                <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
                    <motion.a
                        initial={{ y: 30, opacity: 0 }}
                        viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 1 }}
                        href="#contact"
                        className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 button-header'
                    >Meu Contato <Image src={assets.right_arrow_white} alt='arrow white'
                        className='w-4' /></motion.a>

                    <motion.a
                        initial={{ y: 30, opacity: 0 }}
                        viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 1 }}
                        href="/sample-resume.pdf" download
                        className='px-10 py-3 border border-black rounded-full bg-white flex items-center gap-2 text-black'
                    >Meu Currículo <Image src={assets.download_icon} alt='Icon download'
                        className='w-4' /></motion.a>
                </div>
            </motion.div>
        </div>
    )
}

export default Header
