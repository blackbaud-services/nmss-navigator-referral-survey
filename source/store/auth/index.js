import { setFlashMessage } from '../flashMessages'
import { defaultParams, secureClient } from '../../lib/api'
import { stringify } from 'qs'

const c = {
  AUTH: 'app/auth/AUTH',
  AUTH_SUCCESS: 'app/auth/AUTH_SUCCESS',
  AUTH_FAILURE: 'app/auth/AUTH_FAILURE'
}

export const getAuth = () => dispatch => {
  const params = {
    method: 'getLoginUrl',
    withCredentials: true,
    ...defaultParams
  }
  Promise.resolve()
    .then(() => dispatch({ type: c.AUTH }))
    .then(() =>
      secureClient({
        method: 'get',
        url: `CRConsAPI?${stringify({ ...params })}`
      })
    )
    .then(({ data: { getLoginUrlResponse } }) => {
      dispatch({
        type: c.AUTH_SUCCESS,
        payload: {
          type: 'auth',
          id: getLoginUrlResponse.routing_id,
          ...getLoginUrlResponse
        }
      })
      return getLoginUrlResponse
    })
    .catch(error => {
      dispatch({ type: c.AUTH_FAILURE, payload: error })
      setFlashMessage('A valid auth token is needed', 'danger')
      return Promise.reject(error)
    })
}

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
