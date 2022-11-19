import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Router from 'next/router'
import qs from 'qs'
import { isPath } from 'src/common/helpers'

import { clearSessionCookie, setSessionCookie } from './cookie'

const basePath = ''

const defaultConfig = {
  timeout: 60000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

const hiddenMsgUrl = ['/email/check'].map((e: string) => `${basePath}${e}`)

const getErrorCode = (error: any) => error?.response?.data?.errors?.[0]?.code || error?.response?.status || ''

const getErrorMsg = (error: any) =>
  error?.response?.data?.errors?.[0]?.detail || error?.response?.statusText || error?.response?.status

const addRequestInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: AxiosRequestConfig<any>) => {
      const tokenType = localStorage.getItem('token_type')
      const accessToken = localStorage.getItem('access_token')
      if (!!tokenType && !!accessToken) {
        config.headers['Authorization'] = `${tokenType} ${accessToken}`
      }

      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: 'brackets',
          encode: false,
        })
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )
}

let deletePromise = null
const getDeletePromise = (instance: AxiosInstance) => {
  if (!deletePromise) {
    deletePromise = instance.delete(process.env.PATH_AUTH)
    setTimeout(() => {
      deletePromise = null
    }, 500)
  }
  return deletePromise
}
const onDeleteToken = async (instance: AxiosInstance) => {
  try {
    await getDeletePromise(instance)
  } catch (e2) {
    console.error('Error on logout', e2)
  } finally {
    clearSessionCookie()
    Router.reload()
  }
}

let refreshPromise: Promise<{ data: Types.AuthType }> = null
const getRefreshPromise = (instance: AxiosInstance) => {
  if (!refreshPromise) {
    const refreshToken = localStorage.getItem('refresh_token')
    refreshPromise = instance.post(process.env.PATH_AUTH, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
    setTimeout(() => {
      refreshPromise = null
    }, 500)
  }
  return refreshPromise.then((result) => {
    setSessionCookie(result?.data)
    return result
  })
}

const addResponseInterceptors = (instance: AxiosInstance) => {
  const interceptorId = instance.interceptors.response.use(
    (response: any) => response,
    async (error) => {
      if (!isPath(error.config.url).startsWith(...hiddenMsgUrl)) {
        console.error(getErrorMsg(error))
      }
      if (getErrorCode(error) !== 401 && getErrorCode(error) !== 403) {
        return Promise.reject(error)
      }
      instance.interceptors.response.eject(interceptorId)
      localStorage.removeItem('csrfToken')
      try {
        await getRefreshPromise(instance)
        return instance.request(error.config)
      } catch (e) {
        onDeleteToken(instance)
        Router.push('/login')
      } finally {
        addResponseInterceptors(instance)
      }
    }
  )
}

export const createApiPjc = (config: any = defaultConfig) => {
  const instance = axios.create(config)
  if (config?.client_id) instance.defaults.headers.common['client_id'] = config?.client_id
  if (config?.client_secret) instance.defaults.headers.common['client_secret'] = config?.client_secret
  addRequestInterceptors(instance)
  addResponseInterceptors(instance)
  return instance
}

export const apiPjc = createApiPjc()

export const api = axios.create(defaultConfig)

export const getError = (error) => {
  return error?.response?.data?.error || error?.data?.error || error?.description || error?.error || error || 'Error'
}
