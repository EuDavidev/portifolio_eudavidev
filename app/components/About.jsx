import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'

export const About = ({isDarkMode}) => {
  return (
    <motion.div 
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration:1}}
    id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4 
        initial={{opacity: 0, y: -20}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration:0.5, delay: 0.3}}
        className='text-center mb-2 text-lg font-ovo'>Introdução</motion.h4>
        <motion.h2 
        initial={{opacity: 0, y: -20}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration:0.5, delay: 0.5}}
        className='text-center text-5xl font-ovo'>Sobre mim</motion.h2>

        <motion.div 
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration:0.8}}
        className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
            <motion.div 
            initial={{opacity: 0, scale: 0.9}}
            whileInView={{scale: 1, opacity: 1}}
            transition={{duration:0.6}}
            className='w-64 sm:w-80 rounded-3xl max-w-none'>
                <Image src={assets.user_image} alt='user' className='w-full rounded-3xl'/>
            </motion.div>
            <motion.div 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration:0.6, delay: 0.8}}
            className='flex-1'>
                <p className='mb-10 max-w-2xl font-ovo'>
                   Sou um desenvolvedor web brasileiro apaixonado por inovação, criando experiências digitais que combinam funcionalidade impecável e design marcante. Com um toque brasileiro de criatividade, transformo ideias em soluções de impacto.
                </p>

                <motion.ul 
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration:0.8, delay: 1}}
                className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl font-outfit'>
                   {infoList.map(({icon, iconDark, title, description}, index)=>(
                        <motion.li 
                        whileHover={{scale:1.05}}
                        className='border list-item-dark list-item-light rounded-xl p-6 cursor-pointer hover:bg-[var(--color-lightHover)] hover:-translate-y-1 duration-500' 
                        key= {index}>
                            <Image src={isDarkMode ? iconDark : icon} alt={title} className='w-7 mt-3'/>
                            <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
                            <p className='text-gray-600 text-sm'>{description}</p>
                        </motion.li>
                   ))}
                </motion.ul>

                <motion.h4 
                initial={{opacity: 0, y: 20}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration:0.5, delay: 1.3}}
                className='my-6 text-gray-700 font-ovo dark:text-white/80'>Tools I use</motion.h4>

                <motion.ul 
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration:0.6, delay: 1.5}}
                className='flex items-center gap-3 sm:gap-5'>
                    {toolsData.map((tool, index)=>(
                        <motion.li 
                        whileHover={{scale:1.1}}
                        className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'
                        key={index}>
                            <Image src={tool} alt='Tool' className='w-5 sm:w-7'/>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default About
