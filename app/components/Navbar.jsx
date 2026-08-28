import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SunLight, HalfMoon, ArrowRight, Menu, Xmark } from "iconoir-react";

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "Sobre" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Serviços" },
  { href: "#work", label: "Projetos" },
  { href: "#contact", label: "Contato" },
];

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const reduced = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  // Scroll spy com mapeamento robusto de todas as seções
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 20);

      const sectionMap = [
        { id: 'top', target: 'top' },
        { id: 'about', target: 'about' },
        { id: 'skills', target: 'skills' },
        { id: 'services', target: 'services' },
        { id: 'process', target: 'services' },
        { id: 'work', target: 'work' },
        { id: 'testimonials', target: 'work' },
        { id: 'experience', target: 'work' },
        { id: 'contact', target: 'contact' },
      ];

      // Se estiver bem no topo
      if (window.scrollY < 180) {
        setActiveSection('top');
        return;
      }

      // Se estiver no final da página (rodapé/contato)
      if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 90)) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionMap.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionMap[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionMap[i].target);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Executa no mount inicial
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
      <nav className={`w-full fixed top-0 left-0 right-0 px-5 lg:px-8 xl:px-[8%] py-3.5 flex items-center justify-between z-50 transition-all duration-300 ${
        isScroll
          ? 'glass-nav'
          : 'bg-transparent border-b border-transparent'
      }`}>
        {/* Logo */}
        <a href="#top" className="flex-shrink-0">
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="Logotipo do portfólio"
            className="w-28 cursor-pointer"
            priority
          />
        </a>

        {/* Nav Links Desktop */}
        <ul className="hidden md:flex items-center gap-1 rounded-full px-3 py-1.5 bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 backdrop-blur-md font-sora">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href} className="relative">
                <a
                  href={href}
                  className={`relative block px-3.5 py-1.5 rounded-full text-xs font-sora font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#FF803B]'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-0 bg-[#FF803B]/10 dark:bg-[#FF803B]/15 rounded-full border border-[#FF803B]/30 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3 font-sora">
          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#FF803B]/40 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#FF803B] dark:hover:text-[#FF803B] active:scale-95 shadow-sm"
          >
            {isDarkMode ? (
              <SunLight className="w-5 h-5 text-yellow-400" />
            ) : (
              <HalfMoon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* CTA Contact — desktop */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF803B] text-white text-xs font-sora font-medium transition-all duration-300 hover:bg-[#FF6A1A] hover:shadow-lg hover:shadow-[#FF803B]/20 hover:-translate-y-0.5 cursor-pointer"
          >
            Contato
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#FF803B]/40 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#FF803B] dark:hover:text-[#FF803B] active:scale-95 shadow-sm"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
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
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.ul
                key="menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: reduced ? 500 : 300, damping: reduced ? 50 : 30 }}
                role="dialog"
                aria-label="Menu de navegação"
                className="flex md:hidden flex-col gap-2 py-20 px-8 fixed right-0 top-0 bottom-0 w-72 z-50 h-screen bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white border-l border-black/10 dark:border-white/10 shadow-2xl font-sora"
              >
                <button
                  className="absolute right-6 top-6 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#FF803B]/40 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#FF803B] dark:hover:text-[#FF803B] active:scale-95 shadow-sm"
                  onClick={closeMenu}
                  aria-label="Fechar menu"
                >
                  <Xmark className="w-5 h-5" />
                </button>

                {NAV_LINKS.map(({ href, label }, index) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: reduced ? 0 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.1 + index * 0.05, duration: 0.3 }}
                  >
                    <a
                      className={`block px-4 py-3 rounded-xl font-sora transition-all duration-200 ${
                        activeSection === href.slice(1)
                          ? 'text-[#FF803B] bg-[#FF803B]/10 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                      onClick={closeMenu}
                      href={href}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}

                {/* CTA mobile */}
                <motion.li
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.4, duration: 0.3 }}
                  className="mt-4"
                >
                  <a
                    href="#contact"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF803B] text-white text-sm font-sora font-medium transition-all duration-300 hover:bg-[#FF6A1A] shadow-md shadow-[#FF803B]/20"
                  >
                    Entre em contato
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </motion.li>
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
