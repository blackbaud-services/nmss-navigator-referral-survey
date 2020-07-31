import { deserializeQuestions } from '../../../lib/form'

export default ({ questions, formState }) => {
  return {
    fields: {
      ...deserializeQuestions(questions, formState)
    }
  }
}
