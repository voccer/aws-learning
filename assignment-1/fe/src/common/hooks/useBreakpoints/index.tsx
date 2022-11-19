import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

/**
 * Hook that make component as a sticky nav when scrolling
 */

enum Breakpoints {
  MOBILE = 768,
  TABLET = 1024,
  LAPTOP = 1280,
  DESKTOP = 1536,
}

export function useBreakpoints() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isLaptop, setIsLaptop] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    window.addEventListener('resize', initializeDebounced)
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('resize', initializeDebounced)
    }
  }, [])

  const setBreakpoints = (breakpoint: Breakpoints) => {
    // reset
    setIsMobile(false)
    setIsTablet(false)
    setIsLaptop(false)
    setIsDesktop(false)

    switch (breakpoint) {
      case Breakpoints.MOBILE:
        setIsMobile(true)
        break
      case Breakpoints.TABLET:
        setIsTablet(true)
        break
      case Breakpoints.LAPTOP:
        setIsLaptop(true)
        break
      case Breakpoints.DESKTOP:
        setIsDesktop(true)
        break
      default:
        break
    }
  }

  const initialize = () => {
    const width = (window || {}).innerWidth || 0
    if (width < Breakpoints.MOBILE) {
      setBreakpoints(Breakpoints.MOBILE)
    } else if (width >= Breakpoints.MOBILE && width < Breakpoints.TABLET) {
      setBreakpoints(Breakpoints.TABLET)
    } else if (width >= Breakpoints.TABLET && width < Breakpoints.LAPTOP) {
      setBreakpoints(Breakpoints.LAPTOP)
    } else {
      setBreakpoints(Breakpoints.DESKTOP)
    }
  }

  const initializeDebounced = useDebouncedCallback(initialize, 100)

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  }
}
