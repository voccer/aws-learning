import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 *
 * @param filterTrigger will be call when start screen or when user go back
 */
export function useQueryFilter(filterTrigger: (router: NextRouter) => any) {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    filterTrigger?.(router)
  }, [router.isReady, router.asPath])
}
