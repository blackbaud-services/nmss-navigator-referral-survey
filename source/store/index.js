import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import auth from './auth'
import flashMessages from './flashMessages'
import survey from './survey'

export * from './auth'
export * from './flashMessages'
export * from './survey'

const middleware = [thunk, createLogger()]

export default (initialState = {}) => (
  createStore(
    combineReducers({
      auth,
      flashMessages,
      survey
    }),
    initialState,
    applyMiddleware(...middleware)
  )
)
