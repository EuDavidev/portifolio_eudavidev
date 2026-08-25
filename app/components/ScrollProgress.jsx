'use client'
import React from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

// Barra de progresso de scroll: 3px, #FF803B, fixa no topo.
// Ausente com prefers-reduced-motion.
const ScrollProgress = () => {
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

    if (reduced) return null

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF803B] origin-left z-[60]"
        />
    )
}

export default ScrollProgress
