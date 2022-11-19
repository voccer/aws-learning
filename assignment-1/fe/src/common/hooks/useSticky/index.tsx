import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

/**
 * Hook that make component as a sticky nav when scrolling
 */

export function useSticky(ref: any, navSelectors: string, elementIds: string[]) {
  const [wrapper, setWrapper] = useState<any>()
  const [refTopCoord, setRefTopCoord] = useState<any>()
  // offset for resize event when scrollTop >= element.top + offset
  const offset = 100
  useEffect(() => {
    // add style for .sticky class
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style type="text/css">.sticky{position: fixed; top: 0;z-index: 1000}</style>`
    )

    // set timeout for waiting element initialized before get bounding client rect
    setTimeout(() => {
      if (!refTopCoord) setRefTopCoord(getCoords(ref.current))
    }, 300)

    const newWrapper = document.createElement('div')
    newWrapper.setAttribute('id', 'sticky-nav')
    // insert wrapper before el in the DOM tree
    ref.current.parentNode.insertBefore(newWrapper, ref.current)
    // move el into wrapper
    newWrapper.appendChild(ref.current)
    setWrapper(newWrapper)

    // Bind the event listener
    window.addEventListener('resize', initializeSticky)
    window.addEventListener('scroll', onUpdateStickyNav)
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('resize', initializeSticky)
      window.removeEventListener('scroll', onUpdateStickyNav)
    }
  }, [ref])

  useEffect(() => {
    if (refTopCoord && wrapper) {
      wrapper.style.width = `${refTopCoord.width}px`
      wrapper.style.height = `${refTopCoord.height}px`
    }
  }, [refTopCoord])

  // resize event for sticky nav and wrapper
  const initializeSticky = () => {
    ref.current.classList.remove('sticky')
    const stickyWrapper = document.getElementById('sticky-nav')
    if (stickyWrapper) stickyWrapper.setAttribute('style', '')
    if (ref.current) {
      ref.current.style = ''
      setRefTopCoord(getCoords(ref.current))
    }

    onUpdateStickyNav()
  }

  const getCoords = (elem) => {
    // crossbrowser version
    const box = elem.getBoundingClientRect()

    const body = document.body
    const docEl = document.documentElement

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
    // const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

    const clientTop = docEl.clientTop || body.clientTop || 0
    // const clientLeft = docEl.clientLeft || body.clientLeft || 0

    const top = box.top + scrollTop - clientTop

    // const left = box.left + scrollLeft - clientLeft

    // return { top: Math.round(top), left: Math.round(left) }
    return { top: Math.round(top), width: elem.clientWidth + 2, height: elem.clientHeight }
  }
  /**
   * Active sticky if scrollTop >= ref offset top position
   */
  const handleUpdateStickyNav = () => {
    const refTop = ref.current
    const top = window.pageYOffset || (document.documentElement as any).scrollTop

    ;(elementIds || []).forEach((elementId: string) => {
      const elem = document.getElementById(elementId)
      if (elem) {
        const elemCoords = getCoords(elem)
        if (top >= elemCoords.top - offset && top < elemCoords.top + elemCoords.height - offset) {
          const navs = document.querySelectorAll(navSelectors)
          for (let i = 0; i < navs.length; i++) {
            if ((navs[i].getAttribute('href') || '').indexOf(elementId) > -1) {
              navs[i].classList.add('active')
            } else {
              navs[i].classList.remove('active')
            }
          }
        }
      }
    })

    if (!refTop || !(refTopCoord || {}).top) return

    const isSticky = refTop.classList.contains('sticky')

    if (top >= refTopCoord.top && !isSticky) {
      refTop.classList.add('sticky')
      refTop.style.left = `${refTopCoord.left}px`
      refTop.style.width = `${refTopCoord.width}px`
    }

    if (top < refTopCoord.top && isSticky) {
      refTop.classList.remove('sticky')
      refTop.style = ''
    }
  }

  const onUpdateStickyNav = useDebouncedCallback(handleUpdateStickyNav, 100)
}
