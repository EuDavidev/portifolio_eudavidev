import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://portifolio-eudavidev.vercel.app'),
  title: "Davi Souza — Full Stack Developer",
  description: "Portfólio de Davi Souza, Full Stack Developer brasileiro. Projetos com React, Next.js e Tailwind, com foco em design intuitivo e performance.",
  keywords: ["Davi Souza", "Full Stack Developer", "Next.js", "React", "Tailwind", "portfólio", "desenvolvedor web"],
  authors: [{ name: "Davi Souza" }],
  openGraph: {
    title: "Davi Souza — Full Stack Developer",
    description: "Projetos com React, Next.js e Tailwind, com foco em design intuitivo e performance.",
    url: "https://portifolio-eudavidev.vercel.app",
    siteName: "Portfólio Davi Souza",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davi Souza — Full Stack Developer",
    description: "Projetos com React, Next.js e Tailwind.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body id="top" className={`${sora.variable} font-sora antialiased leading-8 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
