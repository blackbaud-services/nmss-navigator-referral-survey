// Constants
const SET = 'app/flashMessages/SET'
const CLEAR = 'app/flashMessages/CLEAR'

// Actions
export const setFlashMessage = (content, theme = 'success') => ({
  type: SET,
  payload: { content, theme }
})

export const clearFlashMessage = id => ({
  type: CLEAR,
  payload: { id }
})

// Action Handlers
const handleSet = (state, { content, theme }) => {
  const message = {
    content,
    theme,
    id: state.count + 1
  }

  return {
    count: state.count + 1,
    messages: [message, ...state.messages]
  }
}

const handleClear = (state, { id }) => ({
  ...state,
  messages: state.messages.filter(message => message.id !== id)
})

// Reducer
const initialState = {
  count: 0,
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return handleSet(state, action.payload)
    case CLEAR:
      return handleClear(state, action.payload)
    default:
      return state
  }
}
