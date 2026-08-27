import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Davi Souza — Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1E1E1E 0%, #2a2a2a 100%)',
                    color: '#FFFFFF',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 96, fontWeight: 700 }}>
                    <span style={{ color: '#FF803B' }}>Davi</span>
                    <span style={{ color: '#FFFFFF', marginLeft: 12 }}>Souza</span>
                </div>
                <div style={{ fontSize: 40, color: '#FF803B', marginTop: 16 }}>
                    Full Stack Developer
                </div>
                <div style={{ fontSize: 22, color: '#e5e7eb', marginTop: 28 }}>
                    React · Next.js · Tailwind · Full-Stack
                </div>
            </div>
        ),
        size
    )
}
