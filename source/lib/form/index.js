import * as validators from 'constructicon/lib/validators'
import PhoneNumber from 'awesome-phonenumber'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import filter from 'lodash/filter'
import { findQuestion } from '../../lib/survey'

export const createPhone = (phone, country = 'us') =>
  new PhoneNumber(phone, country)

export const isPhoneInvalid = (phone, country) => {
  const pn = createPhone(phone, country)
  return !pn.isValid()
}

export const formatPhone = (phone, country) => {
  const pn = createPhone(phone, country)
  const number = pn.getNumber() || ''
  return number.replace('+', '')
}

export const setColumn = type => {
  if (type === 'MultiSingle' || type === 'ShortTextValue' || type === 'ComboChoice') {
    return true
  }
}

export const customValidators = {
  phone: msg => val => val && isPhoneInvalid(val) && msg
}

export const deserializeQuestions = ({ formState, location, questions }) => {
  const { pathname } = location
  const model = get(formState, `model[${pathname}]`)
  const { mode } = formState
  const questionsArray = questions.map(
    ({
      questionId,
      questionRequired,
      questionText,
      questionType,
      questionTypeData,
      questionHint
    }) => {
      const options = get(
        questionTypeData,
        'surveyQuestionData.availableAnswer'
      )
      const map = findQuestion(pathname, questionId)
      const isPhone = map && map.question === 'phone'
      const isEmail = map && map.question === 'email'
      const initialVal = model && model[`${questionId}`]
      return {
        label: questionText,
        type: questionType,
        id: questionId,
        options:
          options && questionType !== 'YesNo'
            ? questionType !== 'MultiMulti'
              ? filter([{ label: 'Please Select', value: '' }].concat(options), i => i.value !== 'N/A')
              : filter(options, i => i.value !== 'N/A')
            : null,
        initial: initialVal,
        required: mode !== 'demo' && questionRequired === 'true' && true,
        questionHint,
        validators: [
          mode !== 'demo' && questionRequired === 'true' &&
            validators.required('This is a required field'),
          isPhone &&
            customValidators.phone('Please supply a valid phone number'),
          isEmail && validators.email('Please supply a valid email address')
        ]
      }
    }
  )
  return keyBy(questionsArray, 'id')
}
