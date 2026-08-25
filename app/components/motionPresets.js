'use client'
import { useReducedMotion } from 'motion/react'

// Sistema de reveal unificado das seções.
// Container com staggerChildren substitui os delays hardcoded anteriores.
// reduced-motion: fade simples de 200ms, sem deslocamento.
export function useReveal() {
    const reduced = useReducedMotion()
    const ease = [0.22, 1, 0.36, 1]

    const section = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduced ? 0.05 : 0.12,
                delayChildren: reduced ? 0 : 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: reduced ? 0 : 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduced ? 0.2 : 0.5, ease },
        },
    }

    // Item com deslocamento custom (x e/ou y). Usado para entradas direcionais.
    const directionalItem = (dx = 0, dy = 0) => ({
        hidden: { opacity: 0, x: reduced ? 0 : dx, y: reduced ? 0 : dy },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: reduced ? 0.2 : 0.5, ease } },
    })

    const viewport = { once: true, amount: 0.15 }

    return { section, item, directionalItem, viewport, reduced }
}
