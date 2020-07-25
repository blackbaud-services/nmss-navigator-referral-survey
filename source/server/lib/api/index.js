import axios from 'axios'
import { stringify } from 'qs'

export const client = axios.create({
  baseURL: 'https://secure.nationalmssociety.org/site',
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const defaultParams = {
  v: '1.0',
  response_format: 'json',
  api_key: 'ZedRa4uc'
}

export const loginParams = () => ({
  method: 'login',
  user_name: process.env.API_USERNAME,
  password: process.env.API_PASSWORD,
  login_name: process.env.API_USERNAME,
  login_password: process.env.API_PASSWORD,
  ...defaultParams
})

const defaultHeaders = {
  'Access-Control-Allow-Origin': process.env.APPLICATION_URL,
  'Access-Control-Allow-Headers': 'content-type'
}

export const sendResponse = (body, status = 200, headers = {}) => ({
  headers: { ...defaultHeaders, ...headers },
  status,
  body
})

export const sendJson = (json, status = 200, headers = {}) =>
  sendResponse(JSON.stringify(json), status, {
    'Content-Type': 'application/json',
    ...headers
  })

export const sendError = (error, status = 500) =>
  sendResponse(JSON.stringify({ error }), status, {
    'Content-Type': 'application/json'
  })

export const loginAdmin = () =>
  client({
    url: '/SRConsAPI',
    data: stringify(loginParams())
  })
