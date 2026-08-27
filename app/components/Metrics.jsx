'use client'
import React, { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'motion/react'
import { useReveal } from './motionPresets'
import { Cpu, Spark, CodeBrackets } from 'iconoir-react'

const Counter = ({ value, reduced }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10% 0px' })

    useEffect(() => {
        if (!inView || !ref.current) return
        if (reduced) {
            ref.current.textContent = value
            return
        }
        const controls = animate(0, value, {
            duration: 1.2,
            ease: 'easeOut',
            onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) },
        })
        return () => controls.stop()
    }, [inView, value, reduced])

    return <span ref={ref}>{value}</span>
}

const metrics = [
    {
        value: 15, suffix: '+', label: 'Tecnologias',
        icon: <Cpu className="w-6 h-6" />,
    },
    {
        value: 3, suffix: '+', label: 'Anos de experiência',
        icon: <Spark className="w-6 h-6" />,
    },
    {
        value: 5, suffix: '+', label: 'Projetos construídos',
        icon: <CodeBrackets className="w-6 h-6" />,
    },
]

const Metrics = () => {
    const { section, item, viewport, reduced } = useReveal()

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={section}
            className='w-full px-[12%] py-10 font-sora'
        >
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto'>
                {metrics.map(({ value, suffix, label, icon }) => (
                    <motion.div
                        key={label}
                        variants={item}
                        className='premium-card text-center py-8 px-6 rounded-2xl'
                    >
                        <div className='w-12 h-12 mx-auto mb-4 rounded-xl bg-[#FF803B]/10 text-[#FF803B] flex items-center justify-center'>
                            {icon}
                        </div>
                        <p className='text-4xl font-sora text-[#FF803B]'>
                            <Counter value={value} reduced={reduced} />{suffix}
                        </p>
                        <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{label}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Metrics
