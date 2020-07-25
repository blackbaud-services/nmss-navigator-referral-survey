import axios from 'axios'
import get from 'lodash/get'

export const secureClient = axios.create({
  baseURL: 'https://secure.nationalmssociety.org/site',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const client = axios.create({
  baseUrl: 'http://main.nationalmssociety.org/site/'
})

export const defaultParams = {
  v: '1.0',
  response_format: 'json',
  suppress_response_codes: true,
  api_key: 'ZedRa4uc'
}

export const appClient = axios.create({
  baseURL: process.env.APPLICATION_API_URL
})

export const getAuthToken = () => appClient.get('/auth').then(({ data }) => get(data, 'loginResponse.token'))
