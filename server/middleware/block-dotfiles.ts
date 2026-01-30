import { defineEventHandler, getRequestURL, setResponseStatus } from 'h3'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  if (path.includes('/.')) {
    setResponseStatus(event, 404)
    return 'Not Found'
  }
})