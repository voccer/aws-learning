import { buildUrl } from '.'

const DEFAULT_TENANT_REGISTRATION_PARAMS = {
  redirect_path: '/app/tenant_registration/new',
  return_service: 'pjc',
  return_path: '/offices/new',
  login_hint: '',
}

export function getTenantRegistrationUrl(params: Record<string, string>) {
  return buildUrl(`${process.env.APP_NAVIS_BASE}/sso`, {
    ...DEFAULT_TENANT_REGISTRATION_PARAMS,
    ...params,
  })
}
