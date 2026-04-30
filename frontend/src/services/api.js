import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`
})

export const getAssets = () => axios.get(`${API_URL}/asset`)

export const getAssetCounts = () => axios.get(`${API_URL}/asset/status/count`)

export const loginUser = (credentials) => axios.post(`${API_URL}/user/login`, credentials)

export const signupUser = (userData) => axios.post(`${API_URL}/user/signup`, userData)

export const saveAsset = ({ asset, assetId, token }) =>
  axios({
    method: assetId ? 'PUT' : 'POST',
    url: assetId ? `${API_URL}/asset/${assetId}` : `${API_URL}/asset`,
    data: asset,
    headers: authHeaders(token)
  })

export const deleteAssetById = (assetId, token) =>
  axios.delete(`${API_URL}/asset/${assetId}`, {
    headers: authHeaders(token)
  })

export const changeAssetStatus = ({ assetId, status, token }) =>
  axios.put(
    `${API_URL}/asset/status/${assetId}`,
    { status },
    {
      headers: authHeaders(token)
    }
  )

  
//asset