import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { useReveal } from './motionPresets'
import { Mail, MapPin, Phone, Send, Github, Linkedin, Instagram } from 'iconoir-react'

const WHATSAPP_URL = 'https://wa.me/5575999904135?text=' + encodeURIComponent('Olá, Davi! Vi seu portfólio e gostaria de conversar sobre um projeto.')

const CONTACT_INFO = [
  {
    label: 'E-mail',
    value: 'davisouza128@gmail.com',
    href: 'mailto:davisouza128@gmail.com',
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: 'Localização',
    value: 'Bahia, Brasil',
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    label: 'WhatsApp',
    value: 'Chamar agora',
    href: WHATSAPP_URL,
    isExternal: true,
    icon: <Phone className="w-5 h-5" />,
  },
]

export const Contact = ({ isDarkMode }) => {
  const { section, item, directionalItem, viewport, reduced } = useReveal()
  const [status, setStatus] = useState('idle')

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
      id='contact' className='w-full px-[12%] py-10 scroll-mt-20'>

      <motion.div variants={item} className='text-center mb-2'>
        <span className='section-eyebrow'>Contato</span>
      </motion.div>
      <motion.h2
        variants={item}
        className='text-center text-4xl sm:text-5xl font-sora mb-4'>Entre em contato</motion.h2>
      <motion.p
        variants={item}
        className='text-center max-w-2xl mx-auto mb-14 font-sora text-gray-500 dark:text-gray-400'
      >Tem uma ideia ou projeto? Adoraria ouvir sobre. Preencha o formulário ou use um dos canais abaixo.</motion.p>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto'>
        {/* Left — Form (3 cols) */}
        <motion.form
          variants={item}
          onSubmit={onSubmit}
          className='lg:col-span-3 font-sora'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
            <motion.input
              variants={directionalItem(-30, 0)}
              type="text"
              placeholder='Seu nome'
              required
              name='name'
              className='w-full px-4 py-3 rounded-xl border border-black/8 dark:border-white/8 bg-white/50 dark:bg-white/3 outline-none transition-all duration-300 focus:border-[#FF803B]/50 focus:ring-2 focus:ring-[#FF803B]/10 placeholder:text-gray-400'
            />
            <motion.input
              variants={directionalItem(30, 0)}
              type="email"
              placeholder='Seu e-mail'
              required
              name='email'
              className='w-full px-4 py-3 rounded-xl border border-black/8 dark:border-white/8 bg-white/50 dark:bg-white/3 outline-none transition-all duration-300 focus:border-[#FF803B]/50 focus:ring-2 focus:ring-[#FF803B]/10 placeholder:text-gray-400'
            />
          </div>

          <motion.textarea
            variants={directionalItem(0, 30)}
            rows='6'
            placeholder='Sua mensagem'
            required
            name='message'
            className='w-full px-4 py-3 rounded-xl border border-black/8 dark:border-white/8 bg-white/50 dark:bg-white/3 outline-none transition-all duration-300 focus:border-[#FF803B]/50 focus:ring-2 focus:ring-[#FF803B]/10 placeholder:text-gray-400 mb-4 resize-none'
          />

          <motion.button
            variants={item}
            whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
            type='submit'
            disabled={status === 'sending'}
            className='w-full sm:w-auto px-8 py-3 rounded-xl bg-[#FF803B] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#FF6A1A] hover:shadow-lg hover:shadow-[#FF803B]/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer'
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
            <Send className="w-4 h-4" />
          </motion.button>

          <AnimatePresence>
            {status !== 'idle' && status !== 'sending' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0.2 : 0.3 }}
                role='status'
                className={`mt-4 text-sm ${status === 'error' ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}
              >{messages[status]}</motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Right — Contact Info (2 cols) */}
        <motion.div variants={item} className='lg:col-span-2 space-y-4'>
          {CONTACT_INFO.map(({ label, value, href, icon, isExternal }) => {
            const Tag = href ? 'a' : 'div'
            const linkProps = href ? { href, ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {}
            return (
              <Tag
                key={label}
                {...linkProps}
                className='premium-card p-5 flex items-center gap-4 group'
              >
                <div className='w-11 h-11 rounded-xl bg-[#FF803B]/10 text-[#FF803B] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#FF803B]/20 group-hover:scale-110'>
                  {icon}
                </div>
                <div>
                  <p className='text-xs text-gray-400 font-sora'>{label}</p>
                  <p className='text-sm font-sora font-medium'>{value}</p>
                </div>
              </Tag>
            )
          })}

          {/* Social links */}
          <div className='premium-card p-5'>
            <p className='text-xs text-gray-400 font-sora mb-3'>Redes Sociais</p>
            <div className='flex gap-3'>
              {[
                { href: 'https://github.com/EuDavidev/', label: 'GitHub', icon: <Github className="w-5 h-5" /> },
                { href: 'https://www.linkedin.com/in/davi-souza-075540309/', label: 'LinkedIn', icon: <Linkedin className="w-5 h-5" /> },
                { href: 'https://www.instagram.com/eudavidev/', label: 'Instagram', icon: <Instagram className="w-5 h-5" /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className='w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 transition-all duration-300 hover:text-[#FF803B] hover:bg-[#FF803B]/8 hover:-translate-y-0.5'
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact
