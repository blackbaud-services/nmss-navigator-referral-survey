import { setFlashMessage } from '../flashMessages'
import { defaultParams, secureClient } from '../../lib/api'
import { deserializeSurveyPages, formatError, prepareData, prepareMulti } from '../../lib/utils'
import { stringify } from 'qs'
import get from 'lodash/get'

const c = {
  FETCH: 'app/survey/FETCH',
  FETCH_SUCCESS: 'app/survey/FETCH_SUCCESS',
  FETCH_FAILURE: 'app/survey/FETCH_FAILURE',
  SUBMIT: 'app/survey/SUBMIT',
  SUBMIT_SUCCESS: 'app/survey/SUBMIT_SUCCESS',
  SUBMIT_FAILURE: 'app/survey/SUBMIT_FAILURE'
}

export const fetchSurvey = ({ JSESSIONID, id, token }, surveyId) => dispatch => {
  const params = {
    method: 'getSurvey',
    survey_id: surveyId,
    JSESSIONID,
    auth: token
  }
  return Promise.resolve()
    .then(() => dispatch({ type: c.FETCH, payload: 'fetching' }))
    .then(() =>
      secureClient({
        method: 'post',
        url: `CRSurveyAPI;jsessionid=${id}`,
        data: stringify({
          ...params,
          ...defaultParams
        })
      })
    )
    .then(response => {
      const successResponse = get(response, 'data.getSurveyResponse.survey')
      const errorResponse = get(response, 'data.errorResponse')
      if (successResponse) {
        dispatch({
          type: c.FETCH_SUCCESS,
          payload: successResponse
        })
        return successResponse
      } else {
        dispatch({
          type: c.FETCH_FAILURE,
          payload: formatError(errorResponse)
        })
        return Promise.reject(errorResponse)
      }
    })
    .catch(error => {
      setFlashMessage(
        'Survey not found, make sure survey is published',
        'danger'
      )
      dispatch({
        type: c.FETCH_FAILURE,
        payload: error
      })
      return Promise.reject(error)
    })
}

export const submitSurvey = (answers, survey, { JSESSIONID, id, token }) => dispatch => {
  const params = {
    method: 'submitSurvey',
    survey_id: survey.surveyId,
    JSESSIONID,
    auth: token,
    ...defaultParams,
    ...prepareData(answers, survey)
  }
  const data = stringify({ ...params, ...defaultParams }) + prepareMulti(answers, survey)
  return Promise.resolve()
    .then(() => dispatch({ type: c.SUBMIT, payload: params }))
    .then(() =>
      secureClient({
        method: 'post',
        url: `CRSurveyAPI;jsessionid=${id}`,
        data
      })
    )
    .then(({ data }) => {
      const successResponse = get(data, 'submitSurveyResponse.success')

      const errorResponse = get(data, 'errorResponse')
        ? data.errorResponse.message
        : get(data, 'submitSurveyResponse.errors')

      if (successResponse && successResponse === 'true') {
        dispatch({
          type: c.SUBMIT_SUCCESS,
          payload: successResponse
        })
        return successResponse
      } else {
        return Promise.reject(errorResponse)
      }
    })
    .catch(error => {
      dispatch({
        type: c.SUBMIT_FAILURE,
        payload: formatError(error)
      })
      return Promise.reject(error)
    })
}

export default (state = {}, { type, payload = {} }) => {
  switch (type) {
    case c.FETCH: {
      return {
        status: 'fetching'
      }
    }

    case c.SUBMIT: {
      return {
        ...state,
        submit: {
          status: 'fetching'
        }
      }
    }

    case c.FETCH_SUCCESS: {
      return {
        ...payload,
        ...deserializeSurveyPages(payload.surveyQuestions),
        status: 'fetched'
      }
    }

    case c.SUBMIT_SUCCESS: {
      return {
        ...state,
        submit: {
          payload,
          status: 'fetched'
        }
      }
    }

    case c.FETCH_FAILURE: {
      return {
        status: 'failed'
      }
    }

    case c.SUBMIT_FAILURE: {
      return {
        ...state,
        submit: {
          ...payload,
          status: 'failed'
        }
      }
    }

    default: {
      return state
    }
  }
}
