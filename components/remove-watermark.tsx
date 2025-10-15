"use client"

import { useEffect } from "react"

export function RemoveWatermark() {
  useEffect(() => {
    const removeWatermarks = () => {
      // Remove by text content - more specific targeting
      const allElements = document.querySelectorAll("*")
      allElements.forEach((element) => {
        const text = element.textContent?.trim().toLowerCase() || ""
        const htmlEl = element as HTMLElement

        // Check for exact "Built with v0" text
        if (
          text === "built with v0" ||
          text.includes("built with v0") ||
          (text.includes("built with") && text.includes("v0"))
        ) {
          htmlEl.style.setProperty("display", "none", "important")
          htmlEl.style.setProperty("visibility", "hidden", "important")
          htmlEl.style.setProperty("opacity", "0", "important")
          htmlEl.style.setProperty("pointer-events", "none", "important")
          htmlEl.remove()
        }
      })

      // Target fixed/absolute positioned elements at bottom of screen
      const positionedElements = document.querySelectorAll(
        'div[style*="position: fixed"], div[style*="position: absolute"]',
      )
      positionedElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        const computedStyle = window.getComputedStyle(htmlEl)
        const bottom = computedStyle.bottom
        const text = htmlEl.textContent?.toLowerCase() || ""

        // If positioned at bottom and contains v0 text
        if ((bottom && bottom !== "auto") || text.includes("v0") || text.includes("built")) {
          htmlEl.style.setProperty("display", "none", "important")
          htmlEl.remove()
        }
      })

      // Target by attributes and classes
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
        'a[href*="v0.dev"]',
        'a[href*="vercel.com"]',
      ]

      selectors.forEach((selector) => {
        try {
          const elements = document.querySelectorAll(selector)
          elements.forEach((el) => {
            const htmlEl = el as HTMLElement
            htmlEl.style.setProperty("display", "none", "important")
            htmlEl.remove()
          })
        } catch (e) {
          // Ignore selector errors
        }
      })

      // Target iframes that might contain watermarks
      const iframes = document.querySelectorAll("iframe")
      iframes.forEach((iframe) => {
        const src = iframe.src.toLowerCase()
        if (src.includes("v0") || src.includes("vercel")) {
          iframe.style.setProperty("display", "none", "important")
          iframe.remove()
        }
      })
    }

    // Run immediately and aggressively
    removeWatermarks()
    setTimeout(removeWatermarks, 100)
    setTimeout(removeWatermarks, 500)
    setTimeout(removeWatermarks, 1000)

    // Run every 100ms to catch dynamically added watermarks
    const interval = setInterval(removeWatermarks, 100)

    // Observe DOM changes
    const observer = new MutationObserver(() => {
      removeWatermarks()
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "id"],
    })

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  return null
}
