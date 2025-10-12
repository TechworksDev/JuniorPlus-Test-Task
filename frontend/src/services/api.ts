import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    console.info(`${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('Request error: ', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    console.info(`${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data?.error || error.message}`)
    } else if (error.request) {
      console.error('No response from server')
    } else {
      console.error('Request error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api