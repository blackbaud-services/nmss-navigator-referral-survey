import React, { useState } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { setModel } from '../../../store/formState'
import FormTemplate from '../../forms/template'

const PatientInfo = ({ nextUrl, page, router, setModel }) => {
  const [errors, setErrors] = useState([])
  const handleUpdate = data =>
    Promise.resolve()
      .then(() => setModel(data))
      .then(() => router.push(nextUrl))
      .catch(() => setErrors(['Please fill out all required fields']))

  return (
    <FormTemplate
      {...page}
      {...router}
      onSuccess={handleUpdate}
      errors={errors}
      prevUrl='/additional-info'
    />
  )
}

const mapStateToProps = ({ survey, formState }) => ({
  page: get(survey, 'pages[3]'),
  nextUrl: get(formState, 'additionalInfo.showAdditionalContact')
    ? '/additional-contact'
    : '/provider-info'
})

export default connect(mapStateToProps, { setModel })(PatientInfo)
