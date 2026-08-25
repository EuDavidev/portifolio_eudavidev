import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'
import { useReveal } from './motionPresets'

export const About = ({ isDarkMode }) => {
    const { section, item, viewport, reduced } = useReveal()

    const photoItem = {
        hidden: { opacity: 0, scale: reduced ? 1 : 0.95, y: reduced ? 0 : 24 },
        visible: {
            opacity: 1, scale: 1, y: 0,
            transition: { duration: reduced ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={section}
            id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
            <motion.h4
                variants={item}
                className='text-center mb-2 text-lg font-sora'>Introdução</motion.h4>
            <motion.h2
                variants={item}
                className='text-center text-5xl font-sora'>Sobre mim</motion.h2>

            <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
                <motion.div
                    variants={photoItem}
                    className='w-64 sm:w-80 rounded-3xl max-w-none'>
                    <Image src={assets.user_image} alt='user' className='w-full rounded-3xl' />
                </motion.div>
                <div className='flex-1'>
                    <motion.p variants={item} className='mb-10 max-w-2xl font-ovo'>
                        Sou um Full Stack Developer brasileiro apaixonado por tecnologia e inovação, criando experiências digitais que combinam funcionalidade impecável e design marcante. Com um toque brasileiro de criatividade, transformo ideias em soluções de impacto.
                    </motion.p>

                    <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl font-outfit'>
                        {infoList.map(({ icon, iconDark, title, description }, index) => (
                            <motion.li
                                variants={item}
                                whileHover={{ scale: 1.05 }}
                                className='border list-item-dark list-item-light rounded-xl p-6 cursor-pointer hover:bg-[var(--color-lightHover)] hover:-translate-y-1 duration-500'
                                key={index}>
                                <Image src={isDarkMode ? iconDark : icon} alt={title} className='w-7 mt-3' />
                                <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
                                <p className='text-gray-600 text-sm'>{description}</p>
                            </motion.li>
                        ))}
                    </ul>

                    <ul className='flex items-center gap-3 sm:gap-5 mt-6'>
                        {toolsData.map((tool, index) => (
                            <motion.li
                                variants={item}
                                whileHover={{ scale: 1.1 }}
                                className='group relative flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'
                                key={index}>
                                <Image src={tool.icon} alt={tool.name} className='w-5 sm:w-7' />
                                <span
                                    role='tooltip'
                                    className='pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                                >
                                    {tool.name}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

export default About
