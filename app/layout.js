import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ovo",
});

export const metadata = {
  title: "Portifolio - Davi Souza",
  description: "Portfólio pessoal de Davi Souza, exibindo projetos e serviços de design e desenvolvimento web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={`${outfit.variable} ${ovo.variable} antialiased leading-8 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
