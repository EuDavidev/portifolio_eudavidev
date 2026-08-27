import React from 'react'
import { motion } from "motion/react"
import { useReveal } from './motionPresets'
import { processData } from '@/assets/assets'

const Process = () => {
  const { section, item, viewport } = useReveal()

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={section}
      id="process"
      className='w-full px-[12%] py-10 scroll-mt-20'
    >
      <motion.div variants={item} className='text-center mb-2'>
        <span className='section-eyebrow'>Como eu trabalho</span>
      </motion.div>
      <motion.h2 variants={item} className='text-center text-4xl sm:text-5xl font-sora mb-12'>
        Meu Processo
      </motion.h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto font-sora'>
        {processData.map(({ step, title, description, icon }, index) => (
          <motion.div
            key={step}
            variants={item}
            className='premium-card p-6 relative group'
          >
            {/* Step number */}
            <span className='text-3xl font-sora text-[#FF803B]/15 absolute top-4 right-5'>
              {step}
            </span>

            {/* Icon */}
            <div className='w-10 h-10 rounded-xl bg-[#FF803B]/10 text-[#FF803B] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#FF803B]/20 group-hover:scale-110'>
              {icon}
            </div>

            <h3 className='text-sm font-sora mb-2'>{title}</h3>
            <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>{description}</p>

            {/* Connector line (hidden on last item and on mobile stack) */}
            {index < processData.length - 1 && (
              <div className='hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-[#FF803B]/30 to-transparent' />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Process
