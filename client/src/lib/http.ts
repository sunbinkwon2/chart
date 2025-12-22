import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

// Axios 인스턴스 생성
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '', // 환경변수로 API 주소 관리
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 토큰 추가 등 공통 처리 가능
    // config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 전역 처리
    console.error('HTTP Error:', error)
    return Promise.reject(error)
  },
)

export const http = instance
