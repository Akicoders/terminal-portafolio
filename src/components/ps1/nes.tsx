import React, {useEffect, useRef} from "react"
import "../../styles/global.css"
import * as THREE from "three"
import gsap from "gsap"
import {PlainAnimator} from "three-plain-animator/lib/plain-animator"

type GalaxyParameters = {
  count: number
  size: number
  radius: number
  branches: number
  spin: number
  randomness: number
  randomnessPower: number
  insideColor: string
  outsideColor: string
}

const ThreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    canvasRef.current.appendChild(renderer.domElement)

    // Scene
    const scene = new THREE.Scene()

    //Galaxy
    const parameters: GalaxyParameters = {
      count: 2000,
      size: 0.01,
      radius: 0.01,
      branches: 1,
      spin: 0,
      randomness: 0.2,
      randomnessPower: 10,
      insideColor: "#190600",
      outsideColor: "#ff6030",
    }

    let geometry = null
    let material = null
    let points = null
    var pointsHorizontal = null
    let pointsRight = null
    let pointsHorizontal2 = null

    const generateDoor = () => {
      //destroy Galaxy
      if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
        scene.remove(pointsHorizontal)
        scene.remove(pointsHorizontal2)
        scene.remove(pointsRight)
      }

      geometry = new THREE.BufferGeometry()

      const positions = new Float32Array(parameters.count * 3)
      const colors = new Float32Array(parameters.count * 3)

      const colorInside = new THREE.Color(parameters.insideColor)
      const colorOutside = new THREE.Color(parameters.outsideColor)

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        //position
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower)

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        //color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      //Material
      material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      })

      //Points

      points = new THREE.Points(geometry, material)
      pointsHorizontal = new THREE.Points(geometry, material)
      pointsHorizontal2 = new THREE.Points(geometry, material)
      pointsRight = new THREE.Points(geometry, material)

      scene.add(points, pointsRight, pointsHorizontal, pointsHorizontal2)

      points.position.set(-0.9, -3.5, -0.5)
      points.rotation.set(Math.PI * 0.5, Math.PI * 0.5, 0)
      points.scale.set(1.37, 0.2, 0.2)

      pointsRight.position.set(2.1, -3.5, -0.5)
      pointsRight.rotation.set(Math.PI * 0.5, Math.PI * 0.5, 0)
      pointsRight.scale.set(1.37, 0.2, 0.2)

      pointsHorizontal.position.set(2.15, 2, -0.5)
      pointsHorizontal.rotation.set(0, Math.PI, 0)
      pointsHorizontal.scale.set(0.76, 1, 0.2)

      pointsHorizontal2.position.set(-2.8, -3, -0.5)
      pointsHorizontal2.rotation.set(Math.PI, 0, 0)
      pointsHorizontal2.scale.set(1.6, 1, 0.2)
    }

    generateDoor()

    const tl = gsap.timeline()
    let a = false
    tl.to(parameters, {radius: 4, duration: 4, onUpdate: generateDoor}, 0)
    tl.to(
      parameters,
      {randomnessPower: 40, duration: 2, onUpdate: generateDoor},
      3.4,
    )

    setTimeout(() => {
      a = true
      setTimeout(() => {
        a = false
      }, 3000)
    }, 6000)

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 6
    scene.add(camera)

    const texturePath = "spritesheet.png"
    const spriteTexture = new THREE.TextureLoader().load(texturePath)
    const animator = new PlainAnimator(spriteTexture, 14, 1, 14, 5)

    const texture = animator.init()

    const geometry3 = new THREE.PlaneGeometry(6, 6)
    const material3 = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    })

    let mesh3 = new THREE.Mesh(geometry3, material3)
    mesh3.position.set(-0.08, -0.5, 0)

    scene.add(mesh3)

    const tick = () => {
      // Render
      renderer.render(scene, camera)
      if (a == true) {
        animator.animate() // update the animation
      }
      generateDoor()
      requestAnimationFrame(tick)
    }

    tick()

    // Cleanup function
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={canvasRef} />
}

export default ThreeCanvas
