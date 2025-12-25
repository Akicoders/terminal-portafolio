import { useEffect, RefObject } from "react"

// This hook was originally used for SEO but creates visual artifacts
// Keeping it minimal to avoid layout issues
const useContain = (containerRef: RefObject<HTMLDivElement>) => {
  // Disabled - was causing layout issues with hidden elements
  // If SEO text is needed, use proper meta tags instead
}

export default useContain
