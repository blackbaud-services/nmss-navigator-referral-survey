import find from 'lodash/find'
import { surveyMap } from '../../lib/survey'

const c = {
  INIT_ANSWERS: 'app/formState/INIT_ANSWERS',
  SET_MODE: 'app/formState/SET_MODE',
  SET_MODEL: 'app/formState/SET_MODEL',
  SET_INFO: 'app/formState/SET_INFO',
  SET_ANSWERS: 'app/formState/SET_ANSWERS'
}

export const initAnswers = questions => dispatch =>
  dispatch({
    type: c.INIT_ANSWERS,
    payload: questions.reduce((obj, item) => {
      obj[item.questionId] = item.questionRequired === 'true' ? 'N/A' : ''
      return obj
    }, {})
  })

export const setMode = mode => dispatch => dispatch({ type: c.SET_MODE, payload: mode })

export const setModel = (data, pathname) => dispatch => {
  const setInfo = pathname === '/additional-info'

  const patientInfoId =
    setInfo &&
    find(
      surveyMap['/additional-info'],
      i => i.question === 'providePatientInfo' && i
    ).id

  const additionalContactId =
    setInfo &&
    find(
      surveyMap['/additional-info'],
      i => i.question === 'additionalContact' && i
    ).id

  const props = {
    showPatientInfo:
      data[`${patientInfoId}`] !== '' ? data[`${patientInfoId}`] : false,
    showAdditionalContact:
      data[`${additionalContactId}`] !== ''
        ? data[`${additionalContactId}`]
        : false
  }

  return Promise.resolve()
    .then(() =>
      dispatch({
        type: c.SET_MODEL,
        payload: {
          [pathname]: data
        }
      })
    )
    .then(() => {
      dispatch({
        type: c.SET_ANSWERS,
        payload: data
      })
    })
    .then(
      () =>
        setInfo &&
        dispatch({
          type: c.SET_INFO,
          payload: props
        })
    )
}

export default (state = {}, { type, payload = {} }) => {
  switch (type) {
    case c.INIT_ANSWERS: {
      return {
        ...state,
        answers: {
          ...payload
        }
      }
    }
    case c.SET_MODE: {
      return {
        ...state,
        mode: payload.mode
      }
    }
    case c.SET_MODEL: {
      return {
        ...state,
        model: {
          ...state['model'],
          ...payload
        }
      }
    }
    case c.SET_ANSWERS: {
      return {
        ...state,
        answers: {
          ...state.answers,
          ...payload
        }
      }
    }
    case c.SET_INFO: {
      return {
        ...state,
        additionalInfo: {
          ...payload
        }
      }
    }
    default: {
      return state
    }
  }
}
