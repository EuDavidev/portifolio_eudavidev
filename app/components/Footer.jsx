'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

const EMAIL = 'davisouza128@gmail.com'

export const Footer = ({ isDarkMode }) => {
    const [copied, setCopied] = useState(false)
    const reduced = useReducedMotion()

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            // clipboard indisponível: sem feedback destrutivo
        }
    }

    return (
        <div className='mt-20 font-outfit'>
            <div className='text-center'>
                <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='logo' className='w-36 mx-auto mb-2' />

                <button
                    onClick={copyEmail}
                    aria-label={`Copiar e-mail ${EMAIL}`}
                    className='relative w-max flex items-center gap-2 mx-auto cursor-pointer hover:text-[#FF803B] transition-colors duration-300'
                >
                    <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt='' className='w-6' />
                    {EMAIL}
                    <AnimatePresence>
                        {copied && (
                            <motion.span
                                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                                transition={{ duration: reduced ? 0.15 : 0.25 }}
                                className='absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-full px-3 py-1 whitespace-nowrap'
                            >
                                Copiado!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6 '>
                <p>© 2025 Davi Souza. Todos os direitos reservados.</p>
                <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
                    <li><a target='_blank' href="https://github.com/EuDavidev/">GitHub</a></li>
                    <li><a target='_blank' href="https://www.linkedin.com/in/davi-souza-075540309/">LinkedIn</a></li>
                    <li><a target='_blank' href="https://www.instagram.com/eudavidev/">Instagram</a></li>
                </ul>
            </div>

        </div>
    )
}
export default Footer
