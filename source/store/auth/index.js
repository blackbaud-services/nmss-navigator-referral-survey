import { getAuthToken } from '../../lib/api'
import { setFlashMessage } from '../flashMessages'

const c = {
  AUTH: 'app/auth/AUTH',
  AUTH_SUCCESS: 'app/auth/AUTH_SUCCESS',
  AUTH_FAILURE: 'app/auth/AUTH_FAILURE'
}

export const getAuth = token => dispatch =>
  Promise.resolve()
    .then(() => dispatch({ type: c.AUTH }))
    .then(() => (!token || token === 'null' ? getAuthToken() : token))
    .then(token => {
      dispatch({ type: c.AUTH_SUCCESS, payload: { token } })
      return token
    })
    .catch(error => {
      dispatch({ type: c.AUTH_FAILURE, payload: error })
      setFlashMessage('A valid auth token is needed', 'danger')
      return Promise.reject(error)
    })

export default (state = {}, { type, payload = {} }) => {
  switch (type) {
    case c.AUTH: {
      return {
        status: 'fetching'
      }
    }

    case c.AUTH_SUCCESS: {
      return {
        ...payload,
        status: 'fetched'
      }
    }

    case c.AUTH_FAILURE: {
      return {
        status: 'failed'
      }
    }

    default: {
      return state
    }
  }
}
