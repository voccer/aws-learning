import Product from '../product'

export type IncludedData = {
  id: string
  type: string
  attributes: any
  relationships?: any
}

export type APIResponseMeta = {
  count: number
  total_count: number
  total_pages: number
}

export type APIResponseLink = {
  first: string
  last: string
  next: string
  prev: string
  self: string
}

export type JSONApiReponse<T = Product> = {
  data: T
  included: IncludedData[]
  meta: APIResponseMeta
  link: APIResponseLink
}

export type GeneralType = {
  id: string
  type: string
}

export type GeneralAttribute = {
  [key: string]: any
}
