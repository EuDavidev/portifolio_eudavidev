import { serviceData } from '@/assets/assets';
import React from 'react';
import { motion } from "motion/react"
import { useReveal } from './motionPresets'
import { Code, SmartphoneDevice, DesignPencil, Cpu } from 'iconoir-react';

const SERVICE_ICONS = [
  <Code key="web" className="w-6 h-6 text-[#FF803B]" />,
  <SmartphoneDevice key="mobile" className="w-6 h-6 text-[#FF803B]" />,
  <DesignPencil key="design" className="w-6 h-6 text-[#FF803B]" />,
  <Cpu key="automation" className="w-6 h-6 text-[#FF803B]" />,
];

const Services = () => {
  const { section, item, viewport } = useReveal()

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={section}
      id='services' className='w-full px-[12%] py-10 scroll-mt-20'>

      <motion.div variants={item} className='text-center mb-2'>
        <span className='section-eyebrow'>O que eu ofereço</span>
      </motion.div>
      <motion.h2
        variants={item}
        className='text-center text-4xl sm:text-5xl font-sora'>Meus Serviços</motion.h2>

      <motion.p
        variants={item}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-sora text-gray-500 dark:text-gray-400'
      >Desenvolvedor web brasileiro dedicado a criar experiências digitais elegantes e funcionais, com um toque refinado de criatividade.</motion.p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-10 font-sora'>
        {serviceData.map(({ title, description }, index) => (
          <motion.div
            variants={item}
            key={index}
            className='premium-card px-6 py-8 cursor-pointer group'
          >
            <span className='text-xs font-sora text-[#FF803B]/60 mb-6 block'>0{index + 1}.</span>
            <div className='w-12 h-12 rounded-xl bg-[#FF803B]/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#FF803B]/20 group-hover:scale-110'>
              {SERVICE_ICONS[index] || <Code className="w-6 h-6 text-[#FF803B]" />}
            </div>
            <h3 className='text-base font-semibold mb-3 text-gray-800 dark:text-gray-200'>{title}</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
export default Services;
