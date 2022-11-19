import { parse } from 'cookie'

export type PathType = 'public' | 'loginRequired' | 'logoutRequired'

export const publicPath = [
  '/register',
  '/forgot-password',
  '/reset-password',
  '/active-account',
  '/404',
  '/500',
  '/401',
  '/verify',
]

export const logoutRequiredPath = ['/login']

export const isPath = (pathname: string) => {
  pathname = pathname ? decodeURIComponent(pathname) : pathname
  const empty = () => ['', '/', null, undefined].includes(pathname)
  const startsWith = (...routes: string[]) => routes.some((each) => pathname?.startsWith(each) || false)
  const hasParam = (param: string) => pathname?.split('?')?.slice(1)?.join('')?.includes(param) || false
  const getType = () => {
    if (isPath(pathname).startsWith(...publicPath) || [null, undefined].includes(pathname)) {
      return 'public'
    }
    if (isPath(pathname).startsWith(...logoutRequiredPath)) {
      return 'logoutRequired'
    }
    return 'loginRequired'
  }

  return {
    empty,
    startsWith,
    hasParam,
    getType,
  }
}

const parseCookie = (cookie: string | Record<string, string>): Types.CookieType => {
  if ([undefined, null].includes(cookie)) {
    cookie = {}
  } else if (typeof cookie === 'string') {
    cookie = parse(cookie)
  }
  return cookie as Types.CookieType
}

type NavigateCheckProps = {
  pathname: string
  cookie: string | Types.CookieType
}

export const navigateCheck = ({ pathname, cookie }: NavigateCheckProps) => {
  const cookieObject: Types.CookieType = parseCookie(cookie)
  const isLoggedIn = cookieObject.logged_in === 'true'
  const isClientRedirect = !!cookieObject.client_redirect

  if (!isLoggedIn) {
    if (isPath(pathname).getType() === 'loginRequired') {
      pathname = `/login`
    }
    return pathname
  } else if (isPath(pathname).getType() === 'logoutRequired') {
    pathname = '/'
  }

  if (isClientRedirect) {
    pathname = cookieObject.client_redirect
  }
  return pathname
}
