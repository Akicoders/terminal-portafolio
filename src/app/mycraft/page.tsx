"use client"
import React from "react"
import { useConfirmContext } from "../../components/context/ConfirmContext"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/sideBar"
import "./style.css"
import Models from "../../components/threeEffects/3dmodel"

const CraftPage = ({ }) => {
  const containerRef = React.useRef(null)
  const { showConfirmation, setShowConfirmation } = useConfirmContext()

  const handleConfirmationResponse = (confirm) => {
    setShowConfirmation(false) // Hide confirmation dialog in all cases

    if (confirm === true) {
      window.location.reload()
    }
  }

  const videoRef = React.useRef<HTMLVideoElement>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)

  const handleMouseEnter = () => {
    if (containerRef.current)
      containerRef.current.classList.add("itemPoster--visible")
    if (videoRef.current) {
      videoRef.current.style.opacity = "1"
      videoRef.current.style.zIndex = "30"

      videoRef.current.play()
    }
    if (imgRef.current) imgRef.current.style.opacity = "0"
  }

  const handleMouseLeave = () => {
    if (containerRef.current)
      containerRef.current.classList.remove("itemPoster--visible")
    if (videoRef.current) {
      videoRef.current.style.opacity = "0"
      videoRef.current.pause()
    }
    if (imgRef.current) imgRef.current.style.opacity = "1"
  }


  const ShowConfirm = ({ handleConfirmationResponse }) => (
    <div className="confirmation-dialog fixed z-1 bg-white">
      <p className="pb-4">Everything not saved will be lost.</p>
      <div className="flex justify-around">
        <button onClick={() => handleConfirmationResponse(true)}>Yes</button>
        <button onClick={() => handleConfirmationResponse(false)}>Yes</button>
      </div>
    </div>
  )

  var comingBig = `
     ::::::::   ::::::::  ::::    ::::  ::::::::::: ::::    :::  ::::::::        ::::::::   ::::::::   ::::::::  ::::    ::: 
    :+:    :+: :+:    :+: +:+:+: :+:+:+     :+:     :+:+:   :+: :+:    :+:      :+:    :+: :+:    :+: :+:    :+: :+:+:   :+: 
    +:+        +:+    +:+ +:+ +:+:+ +:+     +:+     :+:+:+  +:+ +:+             +:+        +:+    +:+ +:+    +:+ :+:+:+  +:+ 
    +#+        +#+    +:+ +#+  +:+  +#+     +#+     +#+ +:+ +#+ :#:             +#++:++#++ +#+    +:+ +#+    +:+ +#+ +:+ +#+ 
    +#+        +#+    +#+ +#+       +#+     +#+     +#+  +#+#+# +#+   +#+#             +#+ +#+    +#+ +#+    +#+ +#+  +#+#+# 
    #+#    #+# #+#    #+# #+#       #+#     #+#     #+#   #+#+# #+#    #+#      #+#    #+# #+#    #+# #+#    #+# #+#   #+#+# 
     ########   ########  ###       ### ########### ###    ####  ########        ########   ########   ########  ###    ####... `

  var com = `
 ____ ____ _  _ _ _  _ ____ 
 |    |  | |\\/| | |\\ | | __ 
 |___ |__| |  | | | \\| |__] 
                            `

  var soon = `
    ____ ____ ____ _  _ 
    [__  |  | |  | |\\ | 
    ___] |__| |__| | \\| 
                        `

  var coming = `
    _______  _____  _______ _____ __   _  ______      _______  _____   _____  __   _
    |       |     | |  |  |   |   | \\  | |  ____      |______ |     | |     | | \\  |
    |_____  |_____| |  |  | __|__ |  \\_| |_____|      ______| |_____| |_____| |  \\_|
                                                                                    `

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="flex flex-col justify-center  align-baseline items-center h-full w-full whitespace-pre lyratitle lg:px-36 px-4">
          <div className="flex flex-col lg:flex-row justify-center  align-baseline items-center h-full w-full max-[500px]:pt-2">
            <div
              className="relative h-[80vh] aspect-[9/16] w-[100%] lg:max-w-[min(75vw,500px)]  overflow-hidden shadow-lg z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imgRef}
                src="/ProjectsPoster/gloopspost.jpg"
                alt="Gloops"
                className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto object-contain transition-opacity duration-500 z-20"
              />
              <video
                ref={videoRef}
                src="/ProjectsPoster/gloops.mp4"
                className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto object-contain transition-opacity duration-500 opacity-0 z-10"
                loop
                playsInline
                controls
              />
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 flex flex-col lg:flex-row items-end group active:opacity-90 ml-0 lg:ml-4 w-full lg:w-auto h-auto lg:h-[80vh] text-right lg:text-left z-10"
            id="textgloops"
          >
            <div className="relative grow overflow-hidden whitespace-nowrap">
              <p className="fontTitle lg:mr-4 font-bold " ref={containerRef}>
                Gloops
              </p>
            </div>
          </div>
          <video
            src="/ProjectsPoster/gloopsartwork.webm"
            className="w-1/3 [transform:rotateZ(-22deg)] absolute top-20 left-10 z-30 shadow-lg"
            loop
            playsInline
            autoPlay
            muted
            controls={false}
          />

        </div>
        <Models modelUrl={'/ProjectsPoster/gloopsi.glb'} />
      </Layout>
    </>
  )
}

export default CraftPage
