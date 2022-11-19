import dayjs, { Dayjs } from 'dayjs'

export const Format = {
  date: 'YYYY-MM-DD',
  dateSlash: 'YYYY/MM/DD',
  datetime: 'YYYY-MM-DD HH:MM:SS',
  dateJp: 'YYYY年MM月DD日',
  time: 'HH:mm',
  dateTimeDot: 'YYYY.MM.DD',
  dateHour: 'YYYY/MM/DD HH:MM',
}

export const Formatter = {
  date: (date?: string | Date | Dayjs | null, isJp = false): string =>
    !date ? '' : dayjs(date).format(isJp ? Format.dateJp : Format.date),
  dateTime: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.date)),
  dateJp: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateJp)),
  dateTimeDot: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateTimeDot)),
  dateHour: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateHour)),
  dateSlash: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateSlash)),
}

export const getPaymentMethod = (source_type: string, locales: any) => {
  switch (source_type) {
    case 'Spree::CreditCard':
      return locales['creditCard']
    default:
      return ''
  }
}

export const formatUSDNoC = (money: number | string | any, decimals = 2) => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: decimals,
  })

  if (!money) return money
  return formatter.format(+money)
}

export const formatJPY = (money: number | string | any) => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('JPY', {
    style: 'decimal',
  })

  if (!money) return money
  return formatter.format(+money)
}
