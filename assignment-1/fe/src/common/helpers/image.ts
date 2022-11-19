export const handleImageDomain = (link = '') => {
  if (link?.indexOf('http://') == 0 || link?.indexOf('https://') == 0) {
    return link
  }

  return link ? `${process.env.API_BASE}${link}` : ''
}
