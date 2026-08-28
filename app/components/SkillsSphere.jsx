'use client'
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReveal } from './motionPresets'

// ── Skills Database com SVGs e Cores Oficiais Revisadas ──────────────────────────
export const SKILLS_CONFIG = [
  {
    name: 'React',
    category: 'Biblioteca Frontend',
    color: '#61DAFB',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Framework Full Stack',
    color: '#E2E8F0',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Linguagem Tipada',
    color: '#3178C6',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'Linguagem Web',
    color: '#F7DF1E',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Framework Estilização',
    color: '#06B6D4',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Runtime Backend',
    color: '#5FA04E',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'Backend & Automação',
    color: '#3776AB',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.826 0 6.19 2.644 6.19 2.644l.006 2.738h5.814v.826H3.842S0 5.753 0 11.876c0 6.126 3.376 5.91 3.376 5.91h2.012v-2.82s-.11-3.375 3.315-3.375h5.688s3.197.054 3.197-3.116V3.116S18.064 0 11.914 0zm-3.2 1.802a1.045 1.045 0 1 1 0 2.09 1.045 1.045 0 0 1 0-2.09zM12.086 24c6.088 0 5.724-2.644 5.724-2.644l-.006-2.738h-5.814v-.826h8.168s3.842.455 3.842-5.668c0-6.126-3.376-5.91-3.376-5.91h-2.012v2.82s.11 3.375-3.315 3.375H9.62s-3.197-.054-3.197 3.116v5.358S5.936 24 12.086 24zm3.2-1.802a1.045 1.045 0 1 1 0-2.09 1.045 1.045 0 0 1 0 2.09z" />
      </svg>
    ),
  },
  {
    name: 'Java',
    category: 'Backend & Enterprise',
    color: '#ED8B00',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.851 18.56s-.417.112-.667.31c-.694.55-.472.93.306 1.28 1.486.666 4.028.847 6.472.583 1.833-.194 3.694-.805 3.694-1.583 0-.694-1.055-.972-1.722-1.083-.75.333-1.805.528-2.972.583-1.861.083-3.861-.139-5.111-.09zm-1.028-3.056c-.361.25-.361.5 0 .75.778.556 2.417.806 4.083.833 1.583.028 3.361-.139 4.389-.694.417-.222.417-.444.083-.667-.361-.25-1-.417-1.5-.5-.75.306-1.75.472-2.861.528-1.5.083-3.028-.056-4.194-.25zm8.389-4.972c.556.694.444 1.333-.361 1.944-1.361 1.028-3.417 1.5-5.278 1.5-1.861.028-3.528-.417-4.306-.917-.389-.25-.417-.5-.111-.75.389-.333 1.167-.556 1.778-.667-.444-.472-.917-1-.136-1.583-.389-.528-.278-.889.25-1.139.694-.306 1.722-.444 2.694-.472.278.417.556.833.861 1.25.639-.083 1.306-.111 1.944-.111 1.5 0 2.889.222 3.917.944zm2.861 3.722c-.139.417-.5.722-1 .944-.389.167-.889.278-1.389.333.167-.306.222-.667.222-1.028 0-.472-.139-.944-.389-1.361.75.111 1.444.389 1.972.778.444.306.722.722.583 1.334zM10.128 3.033C9.044 4.506 7.461 6.811 7.461 8.839c0 1.222.444 2.361 1.25 3.278-.444-.611-.694-1.389-.694-2.194 0-1.611 1.222-3.472 2.111-4.889.944-1.472 1.472-2.917 1.472-4.167-.028.722-.444 1.472-1.472 2.167z" />
      </svg>
    ),
  },
  {
    name: 'Golang',
    category: 'Backend & Concorrência',
    color: '#00ADD8',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.811 10.231c-.047-.27-.059-.512-.036-.727.07-.631.457-1.025 1.066-1.084.573-.056 1.109.18 1.42.631l.012.018c.245.37.34.78.27 1.16-.07.38-.28.69-.58.87-.31.18-.68.22-1.04.11-.6-.18-.99-.54-1.112-.978zm4.773 1.94c-.05-.41-.04-.84.05-1.25.17-.79.67-1.39 1.37-1.64.69-.25 1.45-.11 2.07.37.52.4.82.99.82 1.63 0 .64-.3 1.23-.82 1.63-.62.48-1.38.62-2.07.37-.7-.25-1.2-.85-1.37-1.64-.03-.16-.04-.32-.05-.47zm9.646-4.632c-.34-.41-.53-.94-.53-1.49 0-.55.19-1.08.53-1.49.34-.41.82-.65 1.34-.65.52 0 1 .24 1.34.65.34.41.53.94.53 1.49 0 .55-.19 1.08-.53 1.49-.34.41-.82.65-1.34.65-.52 0-1-.24-1.34-.65zm-2.03 7.82c-.36-.44-.56-1-.56-1.59 0-.59.2-1.15.56-1.59.36-.44.87-.69 1.42-.69.55 0 1.06.25 1.42.69.36.44.56 1 .56 1.59 0 .59-.2 1.15-.56 1.59-.36.44-.87.69-1.42.69-.55 0-1.06-.25-1.42-.69zm-7.61-3.23c0-.65.23-1.26.65-1.72.42-.46.99-.72 1.61-.72.62 0 1.19.26 1.61.72.42.46.65 1.07.65 1.72 0 .65-.23 1.26-.65 1.72-.42.46-.99.72-1.61.72-.62 0-1.19-.26-1.61-.72-.42-.46-.65-1.07-.65-1.72zm15.41-1.13h-4.37c-.34 0-.61-.27-.61-.61s.27-.61.61-.61h4.37c.34 0 .61.27.61.61s-.27.61-.61.61zm1.5-2.4h-5.87c-.34 0-.61-.27-.61-.61s.27-.61.61-.61h5.87c.34 0 .61.27.61.61s-.27.61-.61.61zm-1.88 4.8h-4.01c-.34 0-.61-.27-.61-.61s.27-.61.61-.61h4.01c.34 0 .61.27.61.61s-.27.61-.61.61z" />
      </svg>
    ),
  },
  {
    name: 'Prisma',
    category: 'ORM & Type-Safe DB',
    color: '#5BC4D1',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z" />
      </svg>
    ),
  },
  {
    name: 'HTML5',
    category: 'Estrutura Semântica',
    color: '#E34F26',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    ),
  },
  {
    name: 'CSS3',
    category: 'Estilização & Animação',
    color: '#1572B6',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'Banco de Dados NoSQL',
    color: '#47A248',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    category: 'Cloud & Autenticação',
    color: '#FFCA28',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.89 15.672L6.255.461A.54.54 0 0 1 7.27.24l2.543 4.772zm16.79 3.529l-1.92-12.04a.54.54 0 0 0-.923-.278L3.686 21.036l8.835 4.969a1.62 1.62 0 0 0 1.579 0l6.58-6.804zM14.28 7.371l-2.08-3.97a.54.54 0 0 0-.962 0L3.72 20.084z" />
      </svg>
    ),
  },
  {
    name: 'Git',
    category: 'Controle de Versão',
    color: '#F05032',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'Design & Prototipagem',
    color: '#F24E1E',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Containers & DevOps',
    color: '#2496ED',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Banco Relacional',
    color: '#336791',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z" />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    category: 'API Query Language',
    color: '#E10098',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.002 0a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.54 4.931a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm0 9.862a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm-8.54 4.931a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.276zm-8.542-4.93a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.277zm0-9.863a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.542-3.378L2.953 6.777v10.448l9.049 5.224 9.047-5.224V6.777zm0 1.601 7.66 13.27H4.34zm-1.387.371L3.97 15.037V7.363zm2.774 0 6.646 3.838v7.674zM5.355 17.44h13.293l-6.646 3.836z" />
      </svg>
    ),
  },
  {
    name: 'Redux',
    category: 'Gerenciamento de Estado',
    color: '#764ABC',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.047-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 00-1.648 1.769c.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.005 4.795-1.603.838-3.296 1.154-4.944.93-1.378-.195-2.456-.81-3.116-1.799-.988-1.499-1.078-3.116-.255-4.734.6-1.17 1.499-2.023 2.099-2.443a9.96 9.96 0 01-.42-1.543C-.868 14.408-.416 18.752.932 20.805c1.004 1.498 3.057 2.456 5.304 2.456.6 0 1.23-.044 1.843-.194 3.897-.749 6.848-3.086 8.541-6.532zm5.348-3.746c-2.32-2.728-5.738-4.226-9.634-4.226h-.51c-.253-.554-.837-.899-1.498-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074a1.69 1.69 0 001.499-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.005 2.622 2.323 3.237 3.897.538 1.288.509 2.547-.045 3.597-.855 1.647-2.294 2.517-4.196 2.517-1.199 0-2.367-.375-2.967-.644-.36.298-.96.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.094-1.647 5.919-3.236.898-1.798.824-4.824-1.47-7.416zM6.49 17.042c.03.899.793 1.648 1.708 1.648h.06a1.688 1.688 0 001.648-1.768c0-.9-.779-1.647-1.693-1.647h-.06c-.06 0-.15 0-.226.029-1.243-2.098-1.768-4.347-1.572-6.772.12-1.828.72-3.417 1.797-4.735.9-1.124 2.593-1.68 3.747-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.45C17.741 3.197 14.686.62 11.764.62 9.02.62 6.49 2.613 5.47 5.535 4.077 9.43 4.991 13.177 6.7 16.174c-.15.195-.24.539-.21.868z" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    category: 'Build Tool & Bundler',
    color: '#646CFF',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.74024 1.05293a.49504.49504 0 0 0-.1569.02512.49338.49338 0 0 0-.25056.1876L7.59513 9.56159a.4895.4895 0 0 0-.08373.22327.48846.48846 0 0 0 .03163.23629.4893.4893 0 0 0 .13985.19319.4927.4927 0 0 0 .2149.10481l3.70685.78609-.22947 4.58007a.48834.48834 0 0 0 .08466.30017.49205.49205 0 0 0 .24931.18854c.10157.03398.21174.03444.3135.00064a.49387.49387 0 0 0 .25056-.18761l5.73735-8.29594a.4884.4884 0 0 0 .08404-.22327c.009-.08015-.0016-.16137-.03163-.23629a.48835.48835 0 0 0-.13985-.19319.49318.49318 0 0 0-.2149-.1048l-3.70686-.7861.22947-4.58008a.48802.48802 0 0 0-.08466-.30017.4913.4913 0 0 0-.24931-.18853.49439.49439 0 0 0-.1566-.02574zM1.15697 9.78795c-.30647.0012-.60009.12378-.81679.34048a1.16107 1.16107 0 0 0-.34017.81648 1.162 1.162 0 0 0 .33366.81957l10.84241 10.8421a1.15762 1.15762 0 0 0 .37677.25211 1.1583 1.1583 0 0 0 .44467.08838c.00084 0 .0016-.00031.0025-.00031.00073 0 .0014.00031.0022.00031a1.15827 1.15827 0 0 0 .44467-.08838 1.15731 1.15731 0 0 0 .37677-.2521l10.84236-10.8421a1.16272 1.16272 0 0 0 .33397-.81958c-.0013-.30647-.12376-.59976-.34048-.81648a1.1616 1.1616 0 0 0-.81679-.34048 1.16114 1.16114 0 0 0-.81926.33366l-5.4012 5.4009c-.0078.0074-.01718.01255-.02482.02015L12 20.14011l-4.59776-4.59745c-.0074-.0074-.01659-.01238-.02419-.01954l-5.4015-5.40151a1.162 1.162 0 0 0-.81958-.33366Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'Repositórios & CI/CD',
    color: '#FFFFFF',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
]

const RADIUS = 185
const CAMERA_DIST = 460

// Posições em Esfera de Fibonacci
function computeFibonacciPositions(count, radius) {
  const points = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = phi * i
    points.push({
      x: Math.cos(theta) * radiusAtY * radius,
      y: y * radius,
      z: Math.sin(theta) * radiusAtY * radius,
    })
  }
  return points
}

const SkillsSphere = () => {
  const { section, item, viewport, reduced } = useReveal()
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Estado para renderização sincronizada com RAF
  const [rotation, setRotation] = useState({ x: -14, y: 0 })

  // Refs de física de alta precisão
  const currentRot = useRef({ x: -14, y: 0 })
  const targetRot = useRef({ x: -14, y: 0 })
  const velocity = useRef({ x: 0, y: 0.16 })
  const isDragging = useRef(false)
  const isHovering = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Posições base estáticas calculadas uma vez (Esfera de Fibonacci)
  const basePoints = useMemo(() => computeFibonacciPositions(SKILLS_CONFIG.length, RADIUS), [])

  // Loop de física fluida com interpolação LERP contínua
  useEffect(() => {
    if (reduced) return
    let animId
    let lastTime = performance.now()

    const loop = (t) => {
      const dt = Math.min(32, t - lastTime)
      lastTime = t
      const timeScale = dt / 16.67 // normalizado para 60fps

      if (isDragging.current) {
        // Durante o drag: interpolação suave seguindo o cursor
        currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.12 * timeScale
        currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.12 * timeScale
      } else if (isHovering.current) {
        // Ao passar o mouse: desaceleração suave sem parada brusca
        velocity.current.x *= Math.pow(0.85, timeScale)
        velocity.current.y *= Math.pow(0.85, timeScale)
        targetRot.current.x += velocity.current.x * timeScale
        targetRot.current.y += velocity.current.y * timeScale
        currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.08 * timeScale
        currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.08 * timeScale
      } else {
        // Modo ocioso: inércia + retorno suave à velocidade padrão
        velocity.current.x *= Math.pow(0.94, timeScale)
        velocity.current.y = velocity.current.y * Math.pow(0.96, timeScale) + 0.16 * (1 - Math.pow(0.96, timeScale))

        targetRot.current.x = Math.max(-55, Math.min(55, targetRot.current.x + velocity.current.x * timeScale))
        targetRot.current.y += velocity.current.y * timeScale

        // LERP suave entre posição atual e target
        currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.07 * timeScale
        currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.07 * timeScale
      }

      setRotation({
        x: currentRot.current.x,
        y: currentRot.current.y % 360,
      })

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [reduced])

  // Handlers de arrasto ultra-suaves com Pointer Events
  const handlePointerDown = useCallback((e) => {
    isDragging.current = true
    lastMousePos.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMousePos.current.x
    const dy = e.clientY - lastMousePos.current.y

    // Sensibilidade calibrada para toque e mouse
    const sensitivity = 0.28

    targetRot.current.y += dx * sensitivity
    targetRot.current.x = Math.max(-60, Math.min(60, targetRot.current.x - dy * sensitivity))

    // Momentum proporcional ao movimento recente
    velocity.current = {
      x: -dy * 0.22,
      y: dx * 0.22,
    }

    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handlePointerUp = useCallback((e) => {
    isDragging.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }, [])

  // Projeção 3D dos pontos calculados em cada frame de rotação
  const projectedSkills = useMemo(() => {
    const radX = (rotation.x * Math.PI) / 180
    const radY = (rotation.y * Math.PI) / 180
    const cosX = Math.cos(radX), sinX = Math.sin(radX)
    const cosY = Math.cos(radY), sinY = Math.sin(radY)

    return SKILLS_CONFIG.map((skill, index) => {
      const p = basePoints[index]

      // Rotação Y
      const x1 = p.x * cosY + p.z * sinY
      const z1 = -p.x * sinY + p.z * cosY

      // Rotação X
      const y1 = p.y * cosX - z1 * sinX
      const z2 = p.y * sinX + z1 * cosX

      // Perspectiva suave
      const scale = CAMERA_DIST / (CAMERA_DIST - z2)
      const screenX = x1 * scale
      const screenY = y1 * scale

      // Profundidade normalizada (0 = trás, 1 = frente)
      const depth = (z2 + RADIUS) / (2 * RADIUS)
      const opacity = Math.max(0.28, Math.min(1, 0.4 + depth * 0.6))
      const size = Math.max(26, Math.min(46, 36 * scale))
      const iconSize = Math.max(13, Math.min(22, 17 * scale))
      const zIndex = Math.round(z2 + RADIUS + 10)

      return {
        ...skill,
        screenX,
        screenY,
        scale,
        opacity,
        size,
        iconSize,
        zIndex,
        z2,
      }
    })
  }, [rotation, basePoints])

  const meridianRx = useMemo(() => {
    const radY = (rotation.y * Math.PI) / 180
    return Math.max(10, Math.abs(Math.cos(radY)) * 185)
  }, [rotation.y])

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={section}
      id="skills"
      className="w-full px-5 sm:px-8 lg:px-[12%] py-12 scroll-mt-20 overflow-hidden"
    >
      <motion.div variants={item} className="text-center mb-2">
        <span className="section-eyebrow">Minhas Skills</span>
      </motion.div>

      <motion.h2 variants={item} className="text-center text-4xl sm:text-5xl font-sora mb-3">
        Stack que eu uso
      </motion.h2>

      <motion.p
        variants={item}
        className="text-center max-w-xl mx-auto mb-10 text-sm font-sora text-gray-500 dark:text-gray-400"
      >
        Tecnologias, linguagens e ferramentas que domino e utilizo para criar aplicações completas e modernas.
      </motion.p>

      {/* Esfera 3D */}
      <motion.div variants={item} className="flex flex-col items-center select-none">
        <div
          ref={containerRef}
          role="img"
          aria-label="Esfera 3D interativa de tecnologias. Arraste para rotacionar."
          className="relative w-full max-w-[450px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => { isHovering.current = true }}
          onMouseLeave={() => { isHovering.current = false; setHoveredSkill(null) }}
        >
          {/* Glow Central */}
          <div
            className="absolute w-[360px] h-[360px] rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle, rgba(255, 128, 59, 0.14) 0%, rgba(255, 128, 59, 0.04) 45%, transparent 72%)',
            }}
          />

          {/* Anéis Orbitais SVG */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full"
            viewBox="0 0 450 450"
            overflow="visible"
            aria-hidden="true"
          >
            {/* Círculo externo */}
            <circle
              cx="225"
              cy="225"
              r="185"
              fill="none"
              stroke="#FF803B"
              strokeOpacity="0.14"
              strokeWidth="1"
            />

            {/* Anéis de latitude pontilhados */}
            <path
              d="M 235.5 306.4 L 251.1 306.6 L 266.5 306.8 L 281.5 307.1 L 296.0 307.5 L 309.7 308.0 L 322.7 308.6 L 334.7 309.2 L 345.7 309.9 L 355.5 310.7 L 364.0 311.6 L 371.2 312.5 L 377.0 313.4 L 381.3 314.4 L 384.2 315.4 L 385.5 316.4 L 385.2 317.4 L 383.4 318.4 L 380.1 319.4 L 375.3 320.4 L 369.0 321.3 L 361.4 322.2 L 352.4 323.0 L 342.2 323.8 L 330.9 324.5 L 318.6 325.1 L 305.3 325.7 L 291.3 326.1 L 276.7 326.5 L 261.5 326.8 L 246.0 327.0 L 230.3 327.0 L 214.5 327.0 L 198.9 326.9 L 183.5 326.7 L 168.5 326.4 L 154.0 326.0 L 140.3 325.5 L 127.3 324.9 L 115.3 324.3 L 104.3 323.5 L 94.5 322.7 L 86.0 321.9 L 78.8 321.0 L 73.0 320.0 L 68.7 319.1 L 65.8 318.1 L 64.5 317.1 L 64.8 316.1 L 66.6 315.1 L 69.9 314.1 L 74.7 313.1 L 81.0 312.2 L 88.6 311.3 L 97.6 310.5 L 107.8 309.7 L 119.1 309.0 L 131.4 308.4 L 144.7 307.8 L 158.7 307.3 L 173.3 307.0 L 188.5 306.7 L 204.0 306.5 L 219.7 306.4 L 235.5 306.4 Z"
              fill="none"
              stroke="#FF803B"
              strokeOpacity="0.12"
              strokeWidth="0.8"
              strokeDasharray="4 6"
            />
            <path
              d="M 237.0 213.1 L 255.1 213.3 L 272.8 213.5 L 290.1 213.9 L 306.8 214.3 L 322.6 214.9 L 337.6 215.6 L 351.4 216.3 L 364.1 217.2 L 375.3 218.1 L 385.2 219.1 L 393.5 220.1 L 400.2 221.2 L 405.2 222.3 L 408.4 223.4 L 409.9 224.6 L 409.6 225.8 L 407.5 226.9 L 403.7 228.1 L 398.2 229.2 L 390.9 230.3 L 382.1 231.3 L 371.8 232.2 L 360.1 233.1 L 347.0 233.9 L 332.8 234.7 L 317.5 235.3 L 301.4 235.8 L 284.5 236.2 L 267.1 236.6 L 249.2 236.8 L 231.1 236.9 L 213.0 236.9 L 194.9 236.7 L 177.2 236.5 L 159.9 236.1 L 143.2 235.7 L 127.4 235.1 L 112.4 234.4 L 98.6 233.7 L 85.9 232.8 L 74.7 231.9 L 64.8 230.9 L 56.5 229.9 L 49.8 228.8 L 44.8 227.7 L 41.6 226.6 L 40.1 225.4 L 40.4 224.2 L 42.5 223.1 L 46.3 221.9 L 51.8 220.8 L 59.1 219.7 L 67.9 218.7 L 78.2 217.8 L 89.9 216.9 L 103.0 216.1 L 117.2 215.3 L 132.5 214.7 L 148.6 214.2 L 165.5 213.8 L 182.9 213.4 L 200.8 213.2 L 218.9 213.1 L 237.0 213.1 Z"
              fill="none"
              stroke="#FF803B"
              strokeOpacity="0.14"
              strokeWidth="0.8"
            />
            <path
              d="M 235.5 123.0 L 251.1 123.1 L 266.5 123.3 L 281.5 123.6 L 296.0 124.0 L 309.7 124.5 L 322.7 125.1 L 334.7 125.7 L 345.7 126.5 L 355.5 127.3 L 364.0 128.1 L 371.2 129.0 L 377.0 130.0 L 381.3 130.9 L 384.2 131.9 L 385.5 132.9 L 385.2 133.9 L 383.4 134.9 L 380.1 135.9 L 375.3 136.9 L 369.0 137.8 L 361.4 138.7 L 352.4 139.5 L 342.2 140.3 L 330.9 141.0 L 318.6 141.6 L 305.3 142.2 L 291.3 142.7 L 276.7 143.0 L 261.5 143.3 L 246.0 143.5 L 230.3 143.6 L 214.5 143.6 L 198.9 143.4 L 183.5 143.2 L 168.5 142.9 L 154.0 142.5 L 140.3 142.0 L 127.3 141.4 L 115.3 140.8 L 104.3 140.1 L 94.5 139.3 L 86.0 138.4 L 78.8 137.5 L 73.0 136.6 L 68.7 135.6 L 65.8 134.6 L 64.5 133.6 L 64.8 132.6 L 66.6 131.6 L 69.9 130.6 L 74.7 129.6 L 81.0 128.7 L 88.6 127.8 L 97.6 127.0 L 107.8 126.2 L 119.1 125.5 L 131.4 124.9 L 144.7 124.3 L 158.7 123.9 L 173.3 123.5 L 188.5 123.2 L 204.0 123.0 L 219.7 123.0 L 235.5 123.0 Z"
              fill="none"
              stroke="#FF803B"
              strokeOpacity="0.12"
              strokeWidth="0.8"
              strokeDasharray="4 6"
            />

            {/* Elipse meridiana rotativa */}
            <ellipse
              cx="225"
              cy="225"
              rx={meridianRx}
              ry="185"
              fill="none"
              stroke="#FF803B"
              strokeOpacity="0.09"
              strokeWidth="0.8"
            />
          </svg>

          {/* Ícones 3D com Projeção e Efeitos */}
          {projectedSkills.map((skill) => {
            const isHovered = hoveredSkill?.name === skill.name

            return (
              <div
                key={skill.name}
                className="absolute transition-transform"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate3d(${skill.screenX - skill.size / 2}px, ${skill.screenY - skill.size / 2}px, 0px)`,
                  zIndex: isHovered ? 999 : skill.zIndex,
                }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div
                  className="flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    width: `${isHovered ? skill.size * 1.25 : skill.size}px`,
                    height: `${isHovered ? skill.size * 1.25 : skill.size}px`,
                    opacity: isHovered ? 1 : skill.opacity,
                    backgroundColor: `${skill.color}1E`,
                    border: `1px solid ${skill.color}${isHovered ? '88' : '33'}`,
                    boxShadow: isHovered
                      ? `0 0 20px ${skill.color}66, 0 0 35px ${skill.color}33`
                      : `0 0 10px ${skill.color}33`,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  <span
                    style={{
                      color: skill.color,
                      filter: `drop-shadow(0 0 3px ${skill.color})`,
                      width: `${isHovered ? skill.iconSize * 1.25 : skill.iconSize}px`,
                      height: `${isHovered ? skill.iconSize * 1.25 : skill.iconSize}px`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {skill.svg}
                  </span>
                </div>

                {/* Tooltip flutuante ao passar o cursor */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none"
                    >
                      <div className="px-2.5 py-1 rounded-lg bg-black/90 dark:bg-black/95 text-white text-[11px] font-sora shadow-xl border border-white/10 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.color }} />
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-gray-400 text-[10px]">· {skill.category}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Legenda de instrução */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 tracking-wide font-sora flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#FF803B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Arraste para rotacionar · passe o cursor para detalhes
        </p>
      </motion.div>
    </motion.div>
  )
}

export default SkillsSphere
