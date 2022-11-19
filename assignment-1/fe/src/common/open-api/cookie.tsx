import Cookies from 'js-cookie'

export const COOKIE_KEY = {
  logged_in: 'logged_in',
  redirect_client: 'redirect_client',
  NEXT_LOCALE: 'NEXT_LOCALE',
}

export const LOCAL_STORAGE_KEY = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  token_type: 'token_type',
  user_name: 'user_name',
  full_name: 'full_name',
  cart_token: 'cart_token',
  profile: 'profile',
  search_data: 'search_data',
}

export const setSessionCookie = (result: Types.AuthType) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.access_token, result.access_token)
  localStorage.setItem(LOCAL_STORAGE_KEY.refresh_token, result.refresh_token)
  localStorage.setItem(LOCAL_STORAGE_KEY.token_type, result.token_type)
  Cookies.set(COOKIE_KEY.logged_in, `true`, {
    expires: result.expires_in,
  })
}

export const clearSessionCookie = () => {
  Object.keys(COOKIE_KEY).forEach((key) => Cookies.remove(key))
  Object.keys(LOCAL_STORAGE_KEY).forEach((key) => localStorage.removeItem(key))
}
