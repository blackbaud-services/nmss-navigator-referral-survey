import { setFlashMessage } from '../flashMessages'
import { defaultParams, secureClient } from '../../lib/api'
import { stringify } from 'qs'
import get from 'lodash/get'

const c = {
  FETCH: 'app/survey/FETCH',
  FETCH_SUCCESS: 'app/survey/FETCH_SUCCESS',
  FETCH_FAILURE: 'app/survey/FETCH_FAILURE'
}
export const fetchSurvey = authParam => dispatch => {
  const params = {
    method: 'getSurvey',
    survey_id: '93436',
    ...authParam
  }
  Promise.resolve()
    .then(() => dispatch({ type: c.FETCH, payload: 'fetching' }))
    .then(() => secureClient({
      method: 'post',
      url: 'CRSurveyAPI',
      data: stringify({ ...params, ...defaultParams })
    }))
    .then(response => dispatch({ type: c.FETCH_SUCCESS, payload: get(response, 'data.getSurveyResponse.survey') }))
    .catch(error => {
      dispatch({ type: c.FETCH_FAILURE, payload: error })
      setFlashMessage('Survey not found, make sure survey is published', 'danger')
      Promise.reject(error)
    })
}

export default (state = {}, { type, payload = {} }) => {
  switch (type) {
    case c.FETCH: {
      return {
        status: 'fetching'
      }
    }

    case c.FETCH_SUCCESS: {
      return {
        ...payload,
        status: 'fetched'
      }
    }

    case c.FETCH_FAILURE: {
      return {
        status: 'failed'
      }
    }

    default: {
      return state
    }
  }
}
