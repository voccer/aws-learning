import { COOKIE_KEY } from 'src/common/open-api'
import { LOCAL_STORAGE_KEY } from 'src/common/open-api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useLanguage } from 'src/common/hooks'

type LanguageType = 'en' | 'jp'

export const withAuth = (Component: any) => {
  const WithAuthWrapper = (props: any) => {
    const router = useRouter()

    const [_lang, setLang] = useLanguage()
    useEffect(() => {
      const currentLang = Cookies.get(COOKIE_KEY.NEXT_LOCALE) || 'jp'
      setLang(currentLang as LanguageType)
    }, [])

    useEffect(() => {
      const loggedIn = Cookies.get(COOKIE_KEY.logged_in)
      const fullName = localStorage.getItem(LOCAL_STORAGE_KEY.full_name)
      const profile = localStorage.getItem(LOCAL_STORAGE_KEY.profile)

      if (loggedIn && !fullName && !profile) {
      } else {
      }
    }, [router.asPath])

    return Component({ ...props })
  }

  return WithAuthWrapper
}
