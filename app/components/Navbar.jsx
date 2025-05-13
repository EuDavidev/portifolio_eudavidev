import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)';
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)';
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <li><a className="font-ovo" href="#top">Home</a></li>
          <li><a className="font-ovo" href="#about">Sobre</a></li>
          <li><a className="font-ovo" href="#services">Serviços</a></li>
          <li><a className="font-ovo" href="#work">Meu Trabalho</a></li>
          <li><a className="font-ovo" href="#contact">Contato</a></li>
        </ul>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode(prev => !prev)}>
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
          <button className="block md:hidden ml-3" onClick={openMenu}>
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt="Ícone de menu"
              className="w-6"
            />
          </button>
        </div>
        <ul ref={sideMenuRef} className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-[var(--color-lightHover)] ">
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <Image
              src={isDarkMode ? assets.close_white : assets.close_black}
              alt="Ícone de fechar menu"
              className="w-5 cursor-pointer"
            />
          </div>
          <li><a className="font-ovo" onClick={closeMenu} href="#top">Home</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#about">Sobre</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#services">Serviços</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#work">Meu Trabalho</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#contact">Contato</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
