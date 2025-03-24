import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const idToken = JSON.parse(sessionStorage.getItem('token') || 'null')

    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

const axiosStatisticsInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

export { axiosInstance, axiosStatisticsInstance }
