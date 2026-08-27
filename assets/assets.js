import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark
};

export const workData = [
    {
        title: 'Projeto Frontend',
        description: 'Landing page moderna para restaurante com design responsivo e animações suaves.',
        bgImage: '/work-1.png',
        link: 'https://restaurante-pi-seven.vercel.app/',
        tags: ['Next.js', 'React', 'Tailwind'],
        category: 'WEB',
        year: '2024',
    },
    {
        title: 'Dev Cake',
        description: 'Site de confeitaria com catálogo interativo e design vibrante.',
        bgImage: '/work-2.png',
        link: 'https://devcake.vercel.app/',
        tags: ['Next.js', 'JavaScript', 'Tailwind'],
        category: 'WEB',
        year: '2024',
    },
    {
        title: 'Site de Carro',
        description: 'Página showcase com design automotivo premium e efeitos visuais.',
        bgImage: '/work-3.png',
        link: 'https://eudavidev.github.io/Site-base-NissanGTR/',
        tags: ['HTML', 'CSS', 'JavaScript'],
        category: 'WEB',
        year: '2023',
    },
    {
        title: 'Dr. Agenda',
        description: 'Sistema de agendamento médico com dashboard e gerenciamento de pacientes.',
        bgImage: '/work-4.png',
        link: 'https://github.com/EuDavidev/doutor-agenda',
        tags: ['Next.js', 'TypeScript', 'Tailwind'],
        category: 'FULLSTACK',
        year: '2025',
    },
]

export const skillsData = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind',
    'Node.js', 'Python', 'Java', 'Go', 'HTML',
    'CSS', 'MongoDB', 'Firebase', 'Git', 'Figma'
];

export const serviceData = [
    { icon: assets.web_icon, title: 'Web Development', description: 'Desenvolvimento de sites e aplicações web modernas, responsivas e otimizadas para performance, com foco em SEO e experiência do usuário.', link: '' },
    { icon: assets.mobile_icon, title: 'Mobile App', description: 'Criação de aplicativos móveis multiplataforma com interfaces intuitivas e integração com APIs e serviços cloud.', link: '' },
    { icon: assets.ui_icon, title: 'UI/UX Design', description: 'Design de interfaces centrado no usuário, com prototipagem em Figma, testes de usabilidade e design systems.', link: '' },
    { icon: assets.graphics_icon, title: 'Automação', description: 'Automações inteligentes com Python e Node.js para otimizar processos, integrar sistemas e aumentar produtividade.', link: '' },
]

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Linguagens', description: 'TypeScript, JavaScript, Java, Python, Go.' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Educação', description: 'UNINTER - Bacharelado em Engenharia de Software' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projetos', description: 'Mais projetos feitos por mim.' }
];

export const toolsData = [
    { icon: assets.vscode, name: 'VS Code' },
    { icon: assets.firebase, name: 'Firebase' },
    { icon: assets.mongodb, name: 'MongoDB' },
    { icon: assets.figma, name: 'Figma' },
    { icon: assets.git, name: 'Git' },
];

import { Notes, Palette, Code, CheckCircle, Rocket } from 'iconoir-react';

// ── Novos dados do redesign ──────────────────────────────────

export const processData = [
    {
        step: '01',
        title: 'Briefing',
        description: 'Entendo suas necessidades, objetivos e visão do projeto em detalhes.',
        icon: <Notes className="w-5 h-5" />,
    },
    {
        step: '02',
        title: 'Design',
        description: 'Crio protótipos visuais no Figma, iterando até a aprovação.',
        icon: <Palette className="w-5 h-5" />,
    },
    {
        step: '03',
        title: 'Código',
        description: 'Desenvolvimento com código limpo, testes e melhores práticas.',
        icon: <Code className="w-5 h-5" />,
    },
    {
        step: '04',
        title: 'Testes',
        description: 'Validação de qualidade, performance e compatibilidade cross-browser.',
        icon: <CheckCircle className="w-5 h-5" />,
    },
    {
        step: '05',
        title: 'Deploy',
        description: 'Publicação, monitoramento e suporte contínuo pós-lançamento.',
        icon: <Rocket className="w-5 h-5" />,
    },
]

export const testimonialsData = [
    {
        name: 'Professor UNINTER',
        role: 'Orientador Acadêmico',
        quote: 'Davi demonstra excelente capacidade técnica e criatividade na resolução de problemas. Seus projetos sempre superam as expectativas.',
        rating: 5,
    },
    {
        name: 'Colega de Equipe',
        role: 'Desenvolvedor',
        quote: 'Trabalhar com o Davi é muito produtivo. Ele tem atenção aos detalhes e sempre entrega código limpo e bem documentado.',
        rating: 5,
    },
    {
        name: 'Supervisor Neoenergia',
        role: 'Gestor de Projetos',
        quote: 'Proativo e dedicado, o Davi trouxe soluções de automação que otimizaram significativamente nossos processos internos.',
        rating: 5,
    },
]

export const experienceData = [
    {
        period: '2024 - Atual',
        title: 'Jovem Aprendiz',
        institution: 'Neoenergia',
        description: 'Atuação em processos administrativos e automações com Python para otimização de workflows internos.',
    },
    {
        period: '2023 - Atual',
        title: 'Desenvolvedor Full Stack',
        institution: 'Freelancer',
        description: 'Desenvolvimento de sites e aplicações web com React, Next.js e Tailwind para clientes diversos.',
    },
]

export const educationData = [
    {
        period: '2024 - Atual',
        title: 'Engenharia de Software',
        institution: 'UNINTER',
        description: 'Bacharelado em Engenharia de Software com foco em desenvolvimento web e arquitetura de sistemas.',
    },
    {
        period: '2023',
        title: 'Cursos e Certificações',
        institution: 'Plataformas Online',
        description: 'React, Next.js, TypeScript, Python e Java através de cursos especializados.',
    },
]
