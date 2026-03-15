"use client"

import React from "react"
import {Layout} from "../components/layout"
import PortfolioContent from "../components/portfolio/PortfolioContent"

const IndexPage = () => {
  return (
    <Layout>
      <div className="workspace-grid">
        <PortfolioContent />
      </div>
    </Layout>
  )
}

export default IndexPage
