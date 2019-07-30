export function formatDate(date, format = 'YYYY-MM-DD hh:mm:ss') {
  if (typeof date === 'string') {
    if (Number.isNaN(Date.parse(date))) {
      format = date
      date = Date.now()
    }
  } else if (date == null) {
    date = Date.now()
  }

  date = new Date(date)
  if (isNaN(date)) {
    throw new TypeError('Illegal `date` type .')
  }
  // All be local time
  const tokens = [
    ['YYYY', date.getFullYear()],
    ['YY', `${date.getFullYear()}`.slice(-2)],
    ['MM', `0${date.getMonth() + 1}`.slice(-2)],
    ['DD', `0${date.getDate()}`.slice(-2)],
    ['hh', `0${date.getHours()}`.slice(-2)],
    ['mm', `0${date.getMinutes()}`.slice(-2)],
    ['ss', `0${date.getSeconds()}`.slice(-2)],
    ['ms', `00${date.getMilliseconds()}`.slice(-3)]
  ]

  tokens.forEach((pair) => {
    const [k, v] = pair
    // k = new RegExp(`${k}`, 'g')
    format = format.replace(k, v)
  }
  )
  return format
}

export function getMonDate(e) {
  var d = new Date(e)
  var day = d.getDay()
  var date = d.getDate()
  if (day === 1) { return d }
  if (day === 0) { d.setDate(date - 6) } else { d.setDate(date - day + 1) }
  return d
}
// 0-6转换成中文名称
export function getDayName(days) {
  var now = new Date()
  const day = parseInt(days)
  if (isNaN(day) || day < 0 || day > 6) { return false }
  const weekday = [{ name: '星期天', current: false }, { name: '星期一', current: false }, { name: '星期二', current: false }, { name: '星期三', current: false }, { name: '星期四', current: false }, { name: '星期五', current: false }, { name: '星期六', current: false }]
  let current = false
  if (day === now.getDay(days)) {
    current = true
  }
  return {
    current: current,
    week: weekday[day].name
  }
}
