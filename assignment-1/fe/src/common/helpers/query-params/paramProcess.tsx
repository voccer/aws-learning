import dayjs, { Dayjs } from 'dayjs'

import { Format } from '../format'

export const DateProcess: Types.ParamProcessType = {
  encode: (val?: string | Date | Dayjs) => (val ? dayjs(val)?.format?.(Format.date) : ''),
  decode: (val?: string) => {
    try {
      return dayjs(val, Format.date)
    } catch (error) {
      return undefined
    }
  },
}

export const DateTimeProcess: Types.ParamProcessType = {
  encode: (val?: string | Date | Dayjs) => (val ? dayjs(val)?.format?.(Format.datetime) : ''),
  decode: (val?: string) => {
    try {
      return dayjs(val, Format.date)
    } catch (error) {
      return undefined
    }
  },
}

export const NumberProcess: Types.ParamProcessType = {
  encode: (val?: number) => (val ? val + '' : ''),
  decode: (val?: string) => (+val ? +val : ''),
}

export const BooleanProcess: Types.ParamProcessType = {
  encode: (val?: boolean) => (val ? val + '' : ''),
  decode: (val?: string) => val === 'true',
}

export const StringProcess: Types.ParamProcessType = {
  encode: (val?: any) => val,
  decode: (val?: any) => val,
}

export const processMap: Record<Types.ParamType, Types.ParamProcessType> = {
  date: DateProcess,
  datetime: DateTimeProcess,
  number: NumberProcess,
  boolean: BooleanProcess,
  string: StringProcess,
}

export const getParamProcessor = (key: string, paramIntructions?: Types.ParamIntructions): Types.ParamProcessType => {
  const processor = processMap[paramIntructions?.[key] || 'string']
  return processor
}
