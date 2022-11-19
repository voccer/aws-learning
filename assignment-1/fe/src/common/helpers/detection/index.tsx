const isProduction = () => process.env.ENVIRONMENT === 'production'
const isStaging = () => process.env.ENVIRONMENT === 'staging'
const isDevelopment = () => process.env.ENVIRONMENT === 'development'
const isLocal = () => process.env.NODE_ENV === 'development'

export const buildEnv = {
  isProduction,
  isStaging,
  isDevelopment,
  isLocal,
}
