import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import auth from './auth'
import formState from './formState'
import flashMessages from './flashMessages'
import survey from './survey'

export * from './auth'
export * from './formState'
export * from './flashMessages'
export * from './survey'

const middleware = [thunk, createLogger()]

export default (initialState = {}) =>
  createStore(
    combineReducers({
      auth,
      flashMessages,
      formState,
      survey
    }),
    initialState,
    applyMiddleware(...middleware)
  )
