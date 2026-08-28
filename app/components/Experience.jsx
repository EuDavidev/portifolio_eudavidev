import React from 'react'
import { motion } from 'motion/react'
import { useReveal } from './motionPresets'
import { experienceData, educationData } from '@/assets/assets'
import { Suitcase, GraduationCap } from 'iconoir-react'

const TimelineItem = ({ item: data, variants }) => (
  <motion.div variants={variants} className='relative pl-8 pb-8 last:pb-0 group'>
    {/* Dot */}
    <div className='absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[#FF803B] bg-[var(--color-bg)] z-10 transition-colors group-hover:bg-[#FF803B]' />
    {/* Line */}
    <div className='absolute left-[5px] top-4 bottom-0 w-px bg-gradient-to-b from-[#FF803B]/30 to-transparent' />

    <div className='premium-card p-5'>
      <span className='text-xs font-sora text-[#FF803B] font-medium'>{data.period}</span>
      <h3 className='text-sm font-sora mt-1'>{data.title}</h3>
      <p className='text-xs text-gray-500 dark:text-gray-400 font-sora mt-0.5'>{data.institution}</p>
      {data.description && (
        <p className='text-xs text-gray-500 dark:text-gray-400 font-sora mt-2 leading-relaxed'>{data.description}</p>
      )}
    </div>
  </motion.div>
)

const Experience = () => {
  const { section, item, viewport } = useReveal()

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={section}
      id="experience"
      className='w-full px-5 sm:px-8 lg:px-[12%] py-10 scroll-mt-20'
    >
      <motion.div variants={item} className='text-center mb-2'>
        <span className='section-eyebrow'>Trajetória</span>
      </motion.div>
      <motion.h2 variants={item} className='text-center text-4xl sm:text-5xl font-sora mb-14'>
        Experiência & Educação
      </motion.h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto'>
        {/* Experiência */}
        <motion.div variants={item}>
          <h3 className='font-sora text-lg mb-6 flex items-center gap-2'>
            <Suitcase className="w-5 h-5 text-[#FF803B]" />
            Experiência
          </h3>
          {experienceData.map((data, index) => (
            <TimelineItem key={index} item={data} variants={item} />
          ))}
        </motion.div>

        {/* Educação */}
        <motion.div variants={item}>
          <h3 className='font-sora text-lg mb-6 flex items-center gap-2'>
            <GraduationCap className="w-5 h-5 text-[#FF803B]" />
            Educação
          </h3>
          {educationData.map((data, index) => (
            <TimelineItem key={index} item={data} variants={item} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Experience
