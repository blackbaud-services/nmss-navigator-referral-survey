import { setFlashMessage } from '../flashMessages'
import { defaultParams, secureClient } from '../../lib/api'
import { deserializeSurveyPages, formatError } from '../../lib/utils'
import { stringify } from 'qs'
import get from 'lodash/get'

const c = {
  FETCH: 'app/survey/FETCH',
  FETCH_SUCCESS: 'app/survey/FETCH_SUCCESS',
  FETCH_FAILURE: 'app/survey/FETCH_FAILURE',
  SET_PAGE: 'app/survey/SET_PAGE',
  SET_SUCCESS: 'app/survey/SET_SUCCESS',
  SET_FAILURE: 'app/survey/SET_FAILURE'
}
export const fetchSurvey = authParam => dispatch => {
  const params = {
    method: 'getSurvey',
    survey_id: process.env.SURVEY_ID,
    ...authParam
  }
  Promise.resolve()
    .then(() => dispatch({ type: c.FETCH, payload: 'fetching' }))
    .then(() =>
      secureClient({
        method: 'post',
        url: 'CRSurveyAPI',
        data: stringify({ ...params, ...defaultParams })
      })
    )
    .then(response => {
      const successResponse = get(response, 'data.getSurveyResponse.survey')
      const errorResponse = get(response, 'data.errorResponse')
      if (successResponse) {
        dispatch({ type: c.FETCH_SUCCESS, payload: successResponse })
      } else {
        throw new Error(
          errorResponse ? formatError(errorResponse) : 'Unknown error occurred'
        )
      }
    })
    .catch(error => {
      setFlashMessage(
        'Survey not found, make sure survey is published',
        'danger'
      )
      dispatch({ type: c.FETCH_FAILURE, payload: error })
      Promise.reject(error)
    })
}

export const setPage = page => dispatch =>
  dispatch({ type: c.SET_PAGE, payload: page })

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
        ...deserializeSurveyPages(payload.surveyQuestions),
        status: 'fetched'
      }
    }

    case c.SET_PAGE: {
      return {
        ...state,
        page: {
          ...payload,
          status: 'fetched'
        }
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
