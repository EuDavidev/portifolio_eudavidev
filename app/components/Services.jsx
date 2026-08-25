import { serviceData } from '@/assets/assets';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from "motion/react"
import { useReveal } from './motionPresets'

const Services = () => {
  const { section, item, viewport } = useReveal()

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={section}
      id='services' className='w-full px-[12%] py-10 scroll-mt-20'>
      <motion.h4
        variants={item}
        className='text-center mb-2 text-lg font-sora'>O que eu ofereço</motion.h4>
      <motion.h2
        variants={item}
        className='text-center text-5xl font-sora'>Meus Serviços</motion.h2>

      <motion.p
        variants={item}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'
      >Desenvolvedor web brasileiro dedicado a criar experiências digitais elegantes e funcionais, com um toque refinado de criatividade.</motion.p>

      <div className='grid grid-cols-auto gap-6 my-10 font-outfit'>
        {serviceData.map(({ icon, title, description, link }, index) => (
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            key={index}
            className='border list-item-dark list-item-light rounded-xl px-8 py-12 cursor-pointer hover:bg-[var(--color-lightHover)] hover:-translate-y-1 duration-500'>
            <Image src={icon} alt={description} className='w-10' />
            <h3 className='text-lg my-4 text-gray-700 '>{title}</h3>
            <p className='text-sm text-gray-600 leading-5 '>
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
export default Services;
