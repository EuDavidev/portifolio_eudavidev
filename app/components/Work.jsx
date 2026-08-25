import { workData } from '@/assets/assets'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from "motion/react"
import { useReveal } from './motionPresets'

// Card com spotlight laranja que segue o cursor (camada absoluta, só transform/opacity).
const ProjectCard = ({ project, variants, reduced }) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,128,59,0.15), transparent 80%)`

    return (
        <motion.div
            variants={variants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onMouseMove={handleMouseMove}
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group overflow-hidden'
            style={{ backgroundImage: `url(${project.bgImage})` }}
        >
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                style={{ textDecoration: 'none' }}
            >
                {!reduced && (
                    <motion.div
                        aria-hidden="true"
                        className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                        style={{ background: spotlight }}
                    />
                )}
                <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                    <div>
                        <h2 className='font-semibold'>{project.title}</h2>
                        <p className='text-sm text-gray-800 '>{project.description}</p>
                    </div>
                    <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-[#FF803B] transition'>
                        <Image src={assets.send_icon} alt='send icon' className='w-5' />
                    </div>
                </div>
            </a>
        </motion.div>
    )
}

export const Work = ({ isDarkMode }) => {
    const { section, item, viewport, reduced } = useReveal()

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={section}
            id='work' className='w-full px-[12%] py-10 scroll-mt-20'>

            <motion.h4
                variants={item}
                className='text-center mb-2 text-lg font-sora'>Meu portifólio</motion.h4>

            <motion.h2
                variants={item}
                className='text-center text-5xl font-sora'>Meus trabalhos recentes</motion.h2>

            <motion.p
                variants={item}
                className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'
            >Bem-vindo ao meu portfólio de desenvolvimento web! Descubra projetos que destacam minha paixão por criar projetos web elegantes e funcionais.</motion.p>

            <div className='grid grid-cols-auto my-10 gap-5 font-outfit dark:text-black'>
                {workData.map((project, index) => (
                    <ProjectCard key={index} project={project} variants={item} reduced={reduced} />
                ))}
            </div>
            <div className='font-outfit'>
                <motion.a
                    variants={item}
                    href="https://github.com/EuDavidev" className='w-max flex items-center justify-center gap-2 text-gray-700 border border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-[var(--color-lightHover)] duration-500 '>
                    Ver mais
                    <Image src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='Right arrow' className='w-4' />
                </motion.a>
            </div>
        </motion.div>
    )
}
export default Work
