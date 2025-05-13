import React, {useState} from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { motion } from "motion/react"

export const Contact = ({isDarkMode}) => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "859fcc17-5a62-4914-ae32-7805a81c3a46");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  
  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration:1}}
    id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-footer dark:bg-none'>

      <motion.h4 
      initial={{y: -20, opacity: 0}}
      whileInView={{y:0, opacity: 1}}
      transition={{delay: 0.3, duration:0.5}}
      className='text-center mb-2 text-lg font-ovo'>Conecte-se comigo</motion.h4>

      <motion.h2 
      initial={{y: -20, opacity: 0}}
      whileInView={{y:0, opacity: 1}}
      transition={{delay: 0.5, duration:0.5}}
      className='text-center text-5xl font-ovo'>Entre em contato</motion.h2>

      <motion.p 
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{delay: 0.7, duration:0.5}}
      className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'>
        Conecte-se comigo! Se você tem perguntas sobre meu trabalho, sugestões para melhorias ou deseja explorar oportunidades de colaboração, por favor, utilize o formulário abaixo. Estou ansioso para ouvir de você e discutir como podemos trabalhar juntos.</motion.p>

      <motion.form 
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{delay: 0.9, duration:0.5}}
      onSubmit={onSubmit} className='max-w-2xl mx-auto font-outfit'>
        <div className='grid grid-cols-auto gap-6 mt-10 mb-8'>

          <motion.input 
          initial={{x: -50, opacity: 0}}
          whileInView={{x:0, opacity: 1}}
          transition={{delay: 1.1, duration:0.6}}
          type="text" placeholder='Digite seu nome' required 
          className='flex-1 p-3 outline-none border rounded-md dark:bg-[var(--color-lightHover)]/30 placeholder:text-gray-500' name='name'/>

          <motion.input 
          initial={{x: 50, opacity: 0}}
          whileInView={{x:0, opacity: 1}}
          transition={{delay: 1.2, duration:0.6}}
          type="email" placeholder='Digite seu email' required 
          className='flex-1 p-3 outline-none border rounded-md dark:bg-[var(--color-lightHover)]/30 placeholder:text-gray-500' name='email'/>
        </div>

        <motion.textarea 
        initial={{y: 100, opacity: 0}}
        whileInView={{y:0, opacity: 1}}
        transition={{delay: 1.3, duration:0.6}}
        rows='6' placeholder='Digite sua mensagem' required
        className='w-full p-4 outiline-none border rounded-md mb-6 dark:bg-[var(--color-lightHover)]/30 placeholder:text-gray-500' name='message'></motion.textarea>

        <motion.button 
        whileHover={{scale:1.05}}
        transition={{duration:0.3}}
        type='submit'
        className='py-3 px-8 w-max flex items-center justify-between gap-2 rounded-full mx-auto duration-500 dark:border dark:hover:bg-[var(--color-lightHover)] cursor-pointer'
        >Enviar agora <Image src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='arrow white' className='w-4'/></motion.button>

        <p className='mt-4'>{result}</p>
      </motion.form>
    </motion.div>
  );
}
export default Contact
