import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

export const Footer = ({isDarkMode}) => {
  return (
    <div className='mt-20 font-outfit'>
        <div className='text-center'>
            <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='logo' className='w-36 mx-auto mb-2'/>

            <div className='w-max flex items-center gap-2 mx-auto'>
                <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt='logo' className='w-6'/>
                davisouza128@gmail.com
            </div>
        </div>

        <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6 '>
            <p>© 2025 Davi Souza. Todos os direitos reservados.</p>
            <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
                <li><a target='_blank' href="https://github.com/Davvwi/">GitHub</a></li>
                <li><a target='_blank' href="https://www.linkedin.com/in/davi-souza-075540309/">LinkedIn</a></li>
                <li><a target='_blank' href="https://www.instagram.com/eudavidev/">Instagram</a></li>
            </ul>
        </div>

    </div>
  )
}
export default Footer
