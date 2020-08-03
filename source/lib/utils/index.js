import filter from 'lodash/filter'
import find from 'lodash/find'

export const deserializeSurveyPages = questions => {
  const pageObjects = filter(
    questions,
    i => i.questionText.indexOf('Page') !== -1
  ).map(page => ({
    name: page.questionText,
    start: Number(page.questionOrderNumber)
  }))

  const pages = pageObjects.map((page, index) => {
    const end = pageObjects[index + 1]
      ? Number(pageObjects[index + 1].start)
      : questions.length
    return {
      ...page,
      end,
      questions: filter(
        questions.slice(page.start, end),
        i => i.questionText.indexOf('Page-') === -1
      )
    }
  })
  return {
    pages
  }
}

export const prepareData = (answers, { surveyQuestions }) => {
  const questions =
    surveyQuestions.filter(question =>
      question.questionType !== 'HiddenTextValue' &&
      question.questionType !== 'Caption'
    )

  const formData = questions.reduce((obj, i) => {
    switch (i.questionType) {
      case 'ComboChoice':
        obj[`combo-control_${i.questionId}`] = find(
          i.questionTypeData.surveyQuestionData.availableAnswer,
          ({ value }) => value === answers[i.questionId]
        )
          ? 'Select'
          : 'Other'
        obj[`question_${i.questionId}`] = answers[i.questionId]
        return obj
      case 'MultiMulti':
        const multi =
          filter(answers[i.questionId].split(','), i => i !== '')
            .reduce((checks, value) => {
              checks[`question_${i.questionId}`] = value
              return checks
            }, {})
        const newObj = {
          ...obj,
          ...multi
        }
        return newObj
      default:
        obj[`question_${i.questionId}`] =
          answers[i.questionId] === true
            ? 'Yes'
            : answers[i.questionId] === false
              ? 'No'
              : answers[i.questionId]
        return obj
    }
  }, {})
  return formData
}

export const formatError = ({ message }) => !message ? 'An unknown error occurred' : message
