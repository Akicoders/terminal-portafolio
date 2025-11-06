"use client"
import React, {useEffect, useRef} from "react"
import * as THREE from "three"

const BurnReveal = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    // Scene, camera, renderer
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({alpha: true})
    if (window.innerWidth >= 760) {
      renderer.setSize(408, 716)
    } else {
      renderer.setSize(272, 485)
    }
    mountRef.current.appendChild(renderer.domElement)

    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    // Fragment shader
    const fragmentShader = `
      uniform float time;
      uniform sampler2D texture1;
      uniform float burnProgress;
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.;
        for (int i = 0; i < 3; i++) {
          value += amplitude * noise(st * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        return value;
      }

      vec3 perturbNormal(vec2 uv, float intensity) {
        vec2 dSTdx = dFdx(uv);
        vec2 dSTdy = dFdy(uv);
        float n = fbm(uv * 4.0);
        float dx = fbm((uv + dSTdx) * 4.0) - n;
        float dy = fbm((uv + dSTdy) * 4.0) - n;
        return normalize(vec3(dx, dy, 1.0) * intensity);
      }

void main() {
    vec2 uv = vUv;
    vec4 tex = texture2D(texture1, uv);

    float borderLeft   = 5.0 / 200.; // 5px / largeur
float borderRight  = 5.0 / 200. ;
float borderTop    = 5.0 / 350.; // 5px / hauteur
float borderBottom = 5.0 / 350.;

// Création du masque pour chaque bord
float borderMask = step(uv.x, borderLeft)        // gauche
                 + step(1.0 - uv.x, borderRight) // droite
                 + step(uv.y, borderBottom)      // bas
                 + step(1.0 - uv.y, borderTop);  // haut



    // Calcul du burn comme avant
    vec2 flameUV = uv;
    float n = fbm(flameUV * 1.95);
    float burnEdge = 1.0 - burnProgress;
    float burn = smoothstep(burnEdge - 0.03, burnEdge + 0.01, n);
    float heat = smoothstep(burnEdge - 0.03, burnEdge + 0.03, n);
    vec3 flameColor = mix(
      vec3(0.9, 0.4, 0.15),
      mix(vec3(1.0, 0.7, 0.3), vec3(1.0, 1.0, 0.9), heat),
      heat
    );
    flameColor += vec3(0.15, 0.05, 0.0) * (1.0 - heat);
    vec3 finalColor = tex.rgb;
    vec3 normal = perturbNormal(uv, 0.4);
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    float diffuse = pow(max(dot(normal, lightDir), 0.0), 0.8);
    float edge = smoothstep(burnEdge - 0.02, burnEdge, n) - smoothstep(burnEdge, burnEdge + 0.02, n);
    finalColor = mix(tex.rgb, flameColor * (diffuse + 0.6), edge * burn * 0.8);

    // Appliquer bordure blanche
    if(borderMask > 0.0){
        finalColor = vec3(1.0); // blanc
    }

    float alpha = burn;
    gl_FragColor = vec4(finalColor, alpha);
}
    `

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {value: 0},
        texture1: {value: null},
        burnProgress: {value: 0},
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    })

    // Plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    //     const borderMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    // const borderGeometry = new THREE.PlaneGeometry(2.1, 2.1); // légèrement plus grand que l'image
    // const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
    // scene.add(borderMesh);
    // borderMesh.position.z = -.2; // derrière l'image pour ne pas la cacher

    // Load texture
    const loader = new THREE.TextureLoader()
    loader.load(
      "/AnIncredibleLife/LYH_1940_concept01_V004-min.jpg", // mettre le chemin correct
      (texture) => {
        material.uniforms.texture1.value = texture

        const startTime = Date.now()

        const animate = () => {
          const elapsed = (Date.now() - startTime) / 1000
          material.uniforms.time.value = elapsed
          material.uniforms.burnProgress.value = Math.min(elapsed / 2.4, 2.0)
          renderer.render(scene, camera)
          requestAnimationFrame(animate)
        }
        animate()
      },
      undefined,
      // (err) => console.error("Erreur de chargement de texture", err)
    )

    // Cleanup
    return () => {
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="grid__item-img photo" />
}

export default BurnReveal
