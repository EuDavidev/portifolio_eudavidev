import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { assets } from '@/assets/assets'
import { motion, AnimatePresence } from "motion/react"
import { useReveal } from './motionPresets'

const WHATSAPP_URL = 'https://wa.me/5575999904135?text=' + encodeURIComponent('Olá, Davi! Vi seu portfólio e gostaria de conversar sobre um projeto.')

export const Contact = ({ isDarkMode }) => {
  const { section, item, directionalItem, viewport, reduced } = useReveal()
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const formData = new FormData(event.target);

    formData.append("access_key", "859fcc17-5a62-4914-ae32-7805a81c3a46");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        event.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const messages = {
    sending: 'Enviando…',
    success: 'Mensagem enviada com sucesso! Retornarei em breve.',
    error: 'Não foi possível enviar. Tente novamente ou me chame no WhatsApp.',
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={section}
      id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-footer dark:bg-none'>

      <motion.h4
        variants={item}
        className='text-center mb-2 text-lg font-sora'>Conecte-se comigo</motion.h4>

      <motion.h2
        variants={item}
        className='text-center text-5xl font-sora'>Entre em contato</motion.h2>

      <motion.p
        variants={item}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'>
        Conecte-se comigo! Se você tem perguntas sobre meu trabalho, sugestões para melhorias ou deseja explorar oportunidades de colaboração, por favor, utilize o formulário abaixo. Estou ansioso para ouvir de você e discutir como podemos trabalhar juntos.</motion.p>

      <motion.form
        variants={item}
        onSubmit={onSubmit} className='max-w-2xl mx-auto font-outfit'>
        <div className='grid grid-cols-auto gap-6 mt-10 mb-8'>

          <motion.input
            variants={directionalItem(-50, 0)}
            type="text" placeholder='Digite seu nome' required
            className='flex-1 p-3 outline-none border rounded-md dark:bg-[var(--color-lightHover)]/30 placeholder:text-gray-500' name='name' />

          <motion.input
            variants={directionalItem(50, 0)}
            type="email" placeholder='Digite seu email' required
            className='flex-1 p-3 outline-none border rounded-md dark:bg-[var(--color-lightHover)]/30 placeholder:text-gray-500' name='email' />
        </div>

        <motion.textarea
          variants={directionalItem(0, 100)}
          rows='6' placeholder='Digite sua mensagem' required
          className='w-full p-4 outiline-none border rounded-md mb-6 dark:bg-[var(--color-lightHover)]/30 placeholder:text-gray-500' name='message'></motion.textarea>

        <motion.div variants={item} className='flex flex-col items-center gap-5'>
          <motion.button
            whileHover={{ scale: status === 'sending' ? 1 : 1.05 }}
            transition={{ duration: 0.3 }}
            type='submit'
            disabled={status === 'sending'}
            className='py-3 px-8 w-max flex items-center justify-between gap-2 rounded-full mx-auto duration-500 dark:border dark:hover:bg-[var(--color-lightHover)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
          >{status === 'sending' ? 'Enviando…' : 'Enviar agora'} <Image src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='arrow white' className='w-4' /></motion.button>

          <Link
            href={WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='w-max flex items-center gap-2 text-sm text-gray-700 border border-gray-400 rounded-full py-2.5 px-6 hover:bg-[var(--color-lightHover)] duration-500'
          >
            Prefere conversar direto? Chamar no WhatsApp
          </Link>
        </motion.div>

        <AnimatePresence>
          {status !== 'idle' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0.2 : 0.3 }}
              role='status'
              className={`mt-4 text-center ${status === 'error' ? 'text-red-600 dark:text-red-400' : ''} ${status === 'success' ? 'text-green-700 dark:text-green-400' : ''}`}
            >{messages[status]}</motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
}
export default Contact
