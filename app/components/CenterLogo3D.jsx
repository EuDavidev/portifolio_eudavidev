'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const CenterLogo3D = ({ rotation }) => {
  const canvasRef = useRef(null)
  const modelRef = useRef(null)
  const reqIdRef = useRef(null)
  const rotationRef = useRef(rotation)
  const [loaded, setLoaded] = useState(false)

  // Manter ref sincronizada com os props de rotação
  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = 220
    const height = 220

    // Cena, Câmera e Renderizador
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Iluminação elegante
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
    scene.add(ambientLight)

    const dirLightFront = new THREE.DirectionalLight(0xffffff, 3.0)
    dirLightFront.position.set(2, 4, 5)
    scene.add(dirLightFront)

    const dirLightOrange = new THREE.DirectionalLight(0xFF803B, 4.0)
    dirLightOrange.position.set(-3, -2, 4)
    scene.add(dirLightOrange)

    const pointLight = new THREE.PointLight(0xFF803B, 2.5, 10)
    pointLight.position.set(0, 0, 2)
    scene.add(pointLight)

    // Grupo para conter o modelo e rotacioná-lo
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    // Carregar modelo GLB
    const loader = new GLTFLoader()
    let isCancelled = false

    loader.load(
      '/3dsvg.glb',
      (gltf) => {
        if (isCancelled) return
        const root = gltf.scene

        // Calcular BoundingBox e centralizar
        const box = new THREE.Box3().setFromObject(root)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        root.position.x -= center.x
        root.position.y -= center.y
        root.position.z -= center.z

        // Ajustar escala para caber perfeitamente no centro
        const maxDim = Math.max(size.x, size.y, size.z) || 1
        const targetScale = 2.4 / maxDim
        root.scale.setScalar(targetScale)

        // Materiais e sombras
        root.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            if (child.material) {
              child.material.metalness = Math.min(child.material.metalness ?? 0.3, 0.7)
              child.material.roughness = Math.max(child.material.roughness ?? 0.3, 0.2)
            }
          }
        })

        modelGroup.add(root)
        modelRef.current = modelGroup
        setLoaded(true)
      },
      undefined,
      (err) => {
        console.error('Erro ao carregar modelo 3dsvg.glb:', err)
      }
    )

    // Loop de renderização sincronizado com a rotação da esfera
    const renderLoop = () => {
      if (modelRef.current) {
        // Converter graus para radianos com suavidade
        const targetRadY = ((rotationRef.current?.y || 0) * Math.PI) / 180
        const targetRadX = ((rotationRef.current?.x || 0) * Math.PI) / 180

        modelRef.current.rotation.y += (targetRadY - modelRef.current.rotation.y) * 0.1
        modelRef.current.rotation.x += (targetRadX - modelRef.current.rotation.x) * 0.1
      }

      renderer.render(scene, camera)
      reqIdRef.current = requestAnimationFrame(renderLoop)
    }

    renderLoop()

    return () => {
      isCancelled = true
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)

      // Limpeza de recursos Three.js
      scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat) => mat.dispose())
            } else {
              obj.material.dispose()
            }
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {/* Glow pulsante de fundo */}
      <div
        className={`absolute w-44 h-44 rounded-full transition-opacity duration-700 pointer-events-none ${
          loaded ? 'opacity-80' : 'opacity-30'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(255, 128, 59, 0.28) 0%, rgba(255, 128, 59, 0.08) 50%, transparent 72%)',
          filter: 'blur(16px)',
        }}
      />

      <canvas
        ref={canvasRef}
        className="w-[220px] h-[220px] max-w-[55vw] max-h-[55vw] pointer-events-none select-none transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  )
}

export default CenterLogo3D
