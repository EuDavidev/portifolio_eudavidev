'use client'
import React, { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useReveal } from './motionPresets'
import { testimonialsData } from '@/assets/assets'
import { Star } from 'iconoir-react'

const StarRating = ({ rating }) => (
  <div className='flex gap-0.5'>
    {[1, 2, 3, 4, 5].map((star) => (
      star <= rating ? (
        <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ) : (
        <Star key={star} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
      )
    ))}
  </div>
)

const AvatarPlaceholder = ({ name }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2)
  return (
    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#FF803B]/30 to-[#FF803B]/10 border border-[#FF803B]/20 flex items-center justify-center text-[#FF803B] font-sora text-xs'>
      {initials}
    </div>
  )
}

const Testimonials = () => {
  const { section, item, viewport } = useReveal()
  const reduced = useReducedMotion()
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(testimonialsData.length / perPage)
  const visible = testimonialsData.slice(page * perPage, page * perPage + perPage)

  if (testimonialsData.length === 0) return null

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={section}
      id="testimonials"
      className='w-full px-[12%] py-10 scroll-mt-20'
    >
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12'>
        <div>
          <span className='section-eyebrow mb-2 block'>Depoimentos</span>
          <h2 className='text-4xl sm:text-5xl font-sora'>O que dizem sobre mim</h2>
        </div>
        <p className='max-w-md text-sm text-gray-500 dark:text-gray-400 font-sora'>
          Feedback de colegas, professores e colaboradores sobre o meu trabalho.
        </p>
      </div>

      {/* Testimonial cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sora'>
        {visible.map((t, index) => (
          <motion.div
            key={`${page}-${index}`}
            variants={item}
            className='premium-card p-6 flex flex-col'
          >
            <StarRating rating={t.rating} />
            <p className='text-sm text-gray-600 dark:text-gray-300 mt-4 flex-1 leading-relaxed italic'>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className='flex items-center gap-3 mt-5 pt-4 border-t border-black/5 dark:border-white/5'>
              <AvatarPlaceholder name={t.name} />
              <div>
                <p className='text-sm font-semibold'>{t.name}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dots pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center gap-2 mt-8'>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Página ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                page === i ? 'w-6 bg-[#FF803B]' : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Testimonials
