import axios from 'axios'
import { getToken } from './auth.js'
import { baseUrl } from '../../config.js'

// const baseUrl = '/api'

export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function createBinge(formdata) {
  return axios.post(`${baseUrl}/binge`, formdata, headers())
}

// export function createMarathon(marathon) {
//   return axios.post(`${baseUrl}/marathons`, marathon)
// }


// * Auth requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
} 

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}

export function getOneMovie(movieId) {
  return axios.get(`${baseUrl}/movies/${movieId}`)
}
