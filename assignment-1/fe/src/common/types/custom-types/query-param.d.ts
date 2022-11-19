export type ParamType = 'date' | 'datetime' | 'number' | 'boolean' | 'string'

export type ParamIntructions = Record<string, ParamType>

export type ParamProcessType = {
  encode: (val: any) => string
  decode: (val: string) => any
}