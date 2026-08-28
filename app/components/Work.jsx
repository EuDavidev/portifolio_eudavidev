import { workData } from '@/assets/assets'
import React from 'react'
import { motion, useMotionValue, useMotionTemplate } from "motion/react"
import { useReveal } from './motionPresets'
import { ArrowUpRight, Github } from 'iconoir-react'

const ProjectCard = ({ project, index, variants, reduced }) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,128,59,0.12), transparent 80%)`

    return (
        <motion.div
            variants={variants}
            onMouseMove={handleMouseMove}
            className='premium-card overflow-hidden group cursor-pointer'
        >
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {/* Image area */}
                <div className='relative aspect-[4/3] overflow-hidden'>
                    <div
                        className='w-full h-full bg-no-repeat bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
                        style={{ backgroundImage: `url(${project.bgImage})` }}
                    />
                    {!reduced && (
                        <motion.div
                            aria-hidden="true"
                            className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                            style={{ background: spotlight }}
                        />
                    )}
                    {/* Overlay badges */}
                    <div className='absolute top-3 left-3 flex items-center gap-2'>
                        <span className='text-xs font-sora text-white bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1'>
                            0{index + 1}
                        </span>
                        <span className='text-xs font-sora text-white bg-[#FF803B]/80 backdrop-blur-sm rounded-lg px-3 py-1'>
                            {project.category}
                        </span>
                    </div>
                    {project.year && (
                        <span className='absolute top-3 right-3 text-xs font-sora text-white bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1'>
                            {project.year}
                        </span>
                    )}
                </div>

                {/* Info area */}
                <div className='p-5 font-sora'>
                    <h3 className='font-sora text-base mb-1'>{project.title}</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3'>{project.description}</p>

                    {/* Tags */}
                    {project.tags && (
                        <div className='flex flex-wrap gap-1.5 mb-4'>
                            {project.tags.map((tag) => (
                                <span key={tag} className='text-[11px] border border-[#FF803B]/30 text-[#FF803B] rounded-full px-2.5 py-0.5 font-medium'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Action row */}
                    <div className='flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5'>
                        <span className='text-xs text-gray-400 group-hover:text-[#FF803B] transition-colors flex items-center gap-1'>
                            Ver projeto
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                        <div className='w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-[#FF803B] group-hover:border-[#FF803B] transition-all duration-300'>
                            <ArrowUpRight className='w-4 h-4 text-gray-500 group-hover:text-white transition-colors' />
                        </div>
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
            id='work' className='w-full px-5 sm:px-8 lg:px-[12%] py-10 scroll-mt-20'>

            <motion.div variants={item} className='text-center mb-2'>
                <span className='section-eyebrow'>Portfólio</span>
            </motion.div>

            <motion.h2
                variants={item}
                className='text-center text-4xl sm:text-5xl font-sora'>Trabalhos recentes</motion.h2>

            <motion.p
                variants={item}
                className='text-center max-w-2xl mx-auto mt-5 mb-12 font-sora text-gray-500 dark:text-gray-400'
            >Uma seleção dos projetos que melhor demonstram minha capacidade técnica e atenção ao design.</motion.p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-10 font-sora'>
                {workData.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} variants={item} reduced={reduced} />
                ))}
            </div>

            <motion.div variants={item} className='flex justify-center'>
                <a
                    href="https://github.com/EuDavidev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex items-center gap-2 px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-sora text-sm transition-all duration-300 hover:border-[#FF803B] hover:text-[#FF803B] hover:-translate-y-0.5'
                >
                    <Github className="w-4 h-4" />
                    Ver mais no GitHub
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
            </motion.div>
        </motion.div>
    )
}
export default Work
