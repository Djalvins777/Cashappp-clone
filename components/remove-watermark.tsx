"use client"

import { useEffect } from "react"

export function RemoveWatermark() {
  useEffect(() => {
    // Function to remove watermark elements
    const removeWatermarks = () => {
      // Target elements by text content
      const allElements = document.querySelectorAll("*")
      allElements.forEach((element) => {
        const text = element.textContent?.toLowerCase() || ""
        if (text.includes("built with") || text.includes("v0") || text.includes("vercel")) {
          const parent = element.parentElement
          if (parent && parent.tagName !== "HTML" && parent.tagName !== "BODY") {
            ;(element as HTMLElement).style.display = "none"
            ;(element as HTMLElement).remove()
          }
        }
      })

      // Target by common watermark attributes
      const selectors = [
        '[class*="watermark"]',
        '[class*="badge"]',
        '[class*="v0"]',
        '[class*="vercel"]',
        '[id*="watermark"]',
        '[id*="badge"]',
        '[id*="v0"]',
        "[data-v0]",
        "[data-vercel]",
        'div[style*="position: fixed"]',
        'div[style*="position: absolute"]',
      ]

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
          const text = el.textContent?.toLowerCase() || ""
          if (text.includes("built") || text.includes("v0")) {
            ;(el as HTMLElement).style.display = "none"
            ;(el as HTMLElement).remove()
          }
        })
      })
    }

    // Run immediately
    removeWatermarks()

    // Run periodically to catch dynamically added watermarks
    const interval = setInterval(removeWatermarks, 500)

    // Also run on DOM changes
    const observer = new MutationObserver(removeWatermarks)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  return null
}
