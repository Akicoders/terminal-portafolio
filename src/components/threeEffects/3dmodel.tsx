"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"
// @ts-ignore - three.js types issue with bundler resolution
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function Models({ modelUrl }: { modelUrl: string }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // === Renderer transparent ===
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(renderer.domElement)

        // === Scene + Camera ===
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            100,
        )
        camera.position.set(0, 1.5, 3)

        // === Light ===
        const light = new THREE.DirectionalLight(0xffffff, 4)
        const pointLight = new THREE.PointLight(0xffffff, 1.8)
        pointLight.position.set(1, 2, 3)
        light.position.set(2, 5, 7.5)
        scene.add(light)
        // scene.add(pointLight)

        scene.add(new THREE.AmbientLight(0xffffff, .8))

        // === Load 3D Model ===
        const loader = new GLTFLoader()
        let mixer: THREE.AnimationMixer | null = null

        loader.load(modelUrl, (gltf) => {

            const model = gltf.scene
            model.scale.set(50, 50, 50)    // ajuste l'échelle si le modèle est trop grand
            model.position.set(1, .8, 0)
            model.rotation.y = -.33
            scene.add(model)

            if (gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model)

                const clip = gltf.animations[1]
                const action = mixer.clipAction(clip)
                action.reset()
                action.play()
            }
        })

        // === Resize ===
        const handleResize = () => {
            renderer.setSize(container.clientWidth, container.clientHeight)
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
        }
        window.addEventListener("resize", handleResize)
        handleResize()

        // === Animation Loop ===
        const clock = new THREE.Clock()
        let animId: number
        const animate = () => {
            const delta = clock.getDelta()
            mixer?.update(delta)
            renderer.render(scene, camera)
            animId = requestAnimationFrame(animate)
        }
        animate()

        // === Cleanup ===
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener("resize", handleResize)
            renderer.dispose()
            container.removeChild(renderer.domElement)
        }
    }, [modelUrl])

    return <div ref={containerRef} className="w-full h-[115vh] absolute top-0 -z-0 hidden lg:block " />
}
