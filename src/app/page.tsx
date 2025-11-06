"use client"
import React from "react"
import ChatComponent from "../components/chatComponent"
import useContain from "../components/context/context"
import Sidebar from "../components/sideBar"
import {Layout} from "../components/layout"


const IndexPage = ({}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef(null)
  useContain(containerRef)


  return (
    <>
      <Sidebar />
      <Layout>
        <div
          ref={containerRef}
          id="yo"
          className="overflow-y-scroll h-full p-4 rounded layout"
        >
          <ChatComponent inputRef={inputRef} containerRef={containerRef} />
        </div>
      </Layout>
    </>
  )
}

export default IndexPage
