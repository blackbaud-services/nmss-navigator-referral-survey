import * as validators from 'constructicon/lib/validators'
import PhoneNumber from 'awesome-phonenumber'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import find from 'lodash/find'

export const formatError = error => {
  switch (error.status) {
    case 422: {
      const errors = get(error, 'data.error.errors') || []
      return errors.map(({ field, message }) => ({
        message: [capitalize(field.split('_').join(' ')), message].join(' ')
      }))
    }
    case 400: {
      const errorMessages = error.data || []
      return errorMessages.map(({ desc }) => ({ message: capitalize(desc) }))
    }
    default: {
      const message =
        get(error, 'data.error.message') ||
        get(error, 'data.errorMessage') ||
        'There was an unexpected error'
      return message ? [{ message }] : []
    }
  }
}

export const allowNumbersOnly = event => {
  const charCode = event.which ? event.which : window.event.keyCode

  if (charCode > 57 || event.shiftKey || charCode === 32) {
    event.preventDefault()
    return false
  }

  return true
}

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

export const customValidators = {
  phone: msg => val => val && isPhoneInvalid(val) && msg
}

export const deserializeQuestions = (questions, formState) => {
  console.log(formState)
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
      const isPhone = ['409285'].indexOf(questionId) !== -1
      const isEmail = ['409286'].indexOf(questionId) !== -1
      const initialVal =
        formState &&
        formState.model &&
        find(formState.model, i => {
          console.log(i, i[`${questionId}`])
          if (i[`${questionId}`] === questionId) {
            return i
          }
        })
      // console.log(initialVal)
      return {
        label: questionText,
        type: questionType,
        id: questionId,
        options:
          options && questionType !== 'YesNo'
            ? questionType !== 'MultiMulti'
              ? [{ label: 'Please Select', value: '' }].concat(options)
              : options
            : null,
        initial: initialVal,
        required: questionRequired === 'true' && true,
        questionHint,
        validators: [
          questionRequired === 'true' &&
            validators.required('This is a required field'),
          isPhone &&
            customValidators.phone('Please supply a valid phone number'),
          isEmail && validators.email('Please supply a valid email address')
        ]
      }
    }
  )
  const questionsObj = keyBy(questionsArray, 'id')
  return questionsObj
}
