const c = {
  SET_MODEL: 'app/formState/SET_MODEL',
  SET_INFO: 'app/formState/SET_INFO',
  SET_ADDRESS: 'app/formState/SET_ADDRESS'
}

export const setModel = data => dispatch =>
  dispatch({ type: c.SET_MODEL, payload: data })

export const setInfo = data => dispatch => {
  const props = {
    showPatientInfo:
      data[`${process.env.PATIENT_INFO_ID}`] !== ''
        ? data[`${process.env.PATIENT_INFO_ID}`]
        : false,
    showAdditionalContact:
      data[`${process.env.ADDITIONAL_CONTACT_ID}`] !== ''
        ? data[`${process.env.ADDITIONAL_CONTACT_ID}`]
        : false
  }
  dispatch({ type: c.SET_INFO, payload: props })
}

export default (state = {}, { type, payload = {} }) => {
  switch (type) {
    case c.SET_MODEL: {
      return {
        ...state,
        model: {
          ...state['model'],
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
    case c.SET_ADDRESS: {
      return {
        ...state,
        address: {
          ...payload
        }
      }
    }
    default: {
      return state
    }
  }
}
