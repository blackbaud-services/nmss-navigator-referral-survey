import { deserializeQuestions } from '../../../lib/form'

export default props => {
  return {
    fields: {
      ...deserializeQuestions(props)
    }
  }
}
