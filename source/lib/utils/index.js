import filter from 'lodash/filter'

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

export const formatError = error => error.message
