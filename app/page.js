'use client'
import { useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Work from "./components/Work";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verifica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Define o tema claro como padrão se não houver tema salvo
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    // Atualiza a classe dark e o localStorage quando isDarkMode muda
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <>
    <Navbar isDarkMode = {isDarkMode} setIsDarkMode={setIsDarkMode}/>
    <Header />
    <About />
    <Services />
    <Work isDarkMode = {isDarkMode} />
    <Contact />
    <Footer isDarkMode = {isDarkMode} />
    </>
  );
}
