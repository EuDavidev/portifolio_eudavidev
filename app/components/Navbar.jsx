import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "Sobre" },
  { href: "#services", label: "Serviços" },
  { href: "#work", label: "Meu Trabalho" },
  { href: "#contact", label: "Contato" },
];

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const reduced = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  // Destaca o link da seção visível na viewport
  useEffect(() => {
    const ids = ['top', 'about', 'services', 'work', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const linkClass = (href) =>
    `font-ovo transition-colors duration-300 ${
      activeSection === href.slice(1) ? 'text-[#FF803B]' : ''
    }`;

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Esc fecha o menu + trava o scroll do body enquanto aberto
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
      </div>
      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white/50 backdrop-blur-lg shadow-sm dark:shadow-white/20" : "bg-transparent"}`}>
        <a href="#top">
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="Logotipo do portfólio"
            className="w-28 cursor-pointer mr-14"
            priority
          />
        </a>
        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white/50 shadow-sm dark:bg-transparent dark:border dark:border-white/50`}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}><a className={linkClass(href)} href={href}>{label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt={isDarkMode ? "Ícone de sol para tema claro" : "Ícone de lua para tema escuro"}
              className="w-6"
            />
          </button>
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-ovo"
          >
            Contato
            <Image
              src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
              alt="Seta para contato"
              className="w-3"
            />
          </a>
          <button
            className="block md:hidden ml-3"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
          >
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt="Ícone de menu"
              className="w-6"
            />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.3 }}
                onClick={closeMenu}
                aria-hidden="true"
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.ul
                key="menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: reduced ? 500 : 300, damping: reduced ? 50 : 30 }}
                role="dialog"
                aria-label="Menu de navegação"
                className="flex md:hidden flex-col gap-4 py-20 px-10 fixed right-0 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 dark:bg-[var(--color-lightHover)]"
              >
                <button
                  className="absolute right-6 top-6"
                  onClick={closeMenu}
                  aria-label="Fechar menu"
                >
                  <Image
                    src={isDarkMode ? assets.close_white : assets.close_black}
                    alt="Ícone de fechar menu"
                    className="w-5 cursor-pointer"
                  />
                </button>
                {NAV_LINKS.map(({ href, label }, index) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: reduced ? 0 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.1 + index * 0.05, duration: 0.3 }}
                  >
                    <a className={linkClass(href)} onClick={closeMenu} href={href}>{label}</a>
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
