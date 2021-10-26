import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const get = async (url: string) => {
  const response = await api.get(url)

  return response.data
}

export const deleteReq = async (url: string) => {
  const response = await api.delete(url)

  return response.status === 200
}

export const post = async (url: string, data: any) => {
  const response = await api.post(url, data)

  return response.status === 201
}

export const put = async (url: string, data: any) => {
  const response = await api.put(url, data)

  return response.status === 200
}
