import { buildUrl } from '.'

export const getAppClientCallback = () => `${process.env.APP_FE}/mfid/auth`

const DEFAULT_MFID_PARAMS = {
  client_id: process.env.APP_CLIENT_ID,
  nonce: process.env.APP_CLIENT_NONCE,
  redirect_uri: getAppClientCallback(),
  response_type: 'code',
  scope: 'openid email',
}

export function getMfidAuthUrl(params?: Record<string, string>) {
  return buildUrl(`${process.env.APP_MFID_BASE}/account_selector`, {
    ...DEFAULT_MFID_PARAMS,
    ...params,
  })
}
