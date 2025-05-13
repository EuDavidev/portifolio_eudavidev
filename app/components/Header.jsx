import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

export const Header = ({IsDarkMode}) => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 font-outfit'>

        <motion.div
        initial={{scale: 0}}
        whileInView={{scale: 1}}
        transition={{duration:0.8, type: 'spring', stiffness: 100}}
        >
            <Image src={assets.profile_img} alt='Foto de perfil Davi Souza'
            className='rounded-full w-32' />
        </motion.div>
        <motion.h3
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration:0.6, delay: 0.3}}
        className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo'>Olá! Eu sou Davi Souza <Image src={assets.hand_icon} alt='' className='w-6'/></motion.h3>
        <motion.h1
        initial={{y: -30, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.8, delay: 0.5}}
        className='text-3xl sm:text-6xl lg:text-[66px] font-ovo'>
            Desenvolvedor Web Brasileiro
        </motion.h1>
        <motion.p 
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration:0.6, delay: 0.7}}
        className='max-w-2xl mx-auto font-ovo'>
        Sou um desenvolvedor web brasileiro especializado em criar interfaces modernas com React e TailwindCSS. Com paixão por design intuitivo, transformo ideias em soluções digitais que engajam e performam.
        </motion.p>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <motion.a
            initial={{y: 30, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration:0.6, delay: 1}}
            href="#contact" 
            className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 button-header'
            >Meu Contato <Image src={assets.right_arrow_white} alt='arrow white'
            className='w-4' /></motion.a>

            <motion.a 
            initial={{y: 30, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration:0.6, delay: 1}}
            href="/sample-resume.pdf" download 
            className='px-10 py-3 border border-black rounded-full bg-white flex items-center gap-2 text-black'
            >Meu Currículo <Image src={assets.download_icon} alt='Icon download'
            className='w-4' /></motion.a>
        </div>
    </div>
 )
}

export default Header
