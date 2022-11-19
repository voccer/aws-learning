const START_DATE = 'June 2022'

export function generateTime() {
  const date = START_DATE
  const result = []

  const end_date = new Date(date.replace(' ', ' ,1 '))
  const start_date = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  while (end_date <= start_date) {
    result.push(
      start_date.toLocaleString('default', {
        month: '2-digit',
        year: 'numeric',
      })
    )
    start_date.setMonth(start_date.getMonth() - 1)
  }
  return result.map((item) => ({
    key: item,
    value: item.split('/')[0] + '-' + item.split('/')[1],
    label: item.split('/')[1] + `年` + item.split('/')[0] + `月`,
  }))
}
