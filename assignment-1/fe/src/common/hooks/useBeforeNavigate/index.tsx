import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 *
 * @param callback will be call when user click backward/forward on navigation
 */
export function useBeforeNavigate(callback: any) {
  const router = useRouter()
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        callback?.()
      }
      return true
    })
    return () => {
      router.beforePopState(() => true)
    }
  }, [router])
}
