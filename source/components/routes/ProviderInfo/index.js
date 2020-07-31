import React, { useState } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { setModel } from '../../../store/formState'
import FormTemplate from '../../forms/template'

const ProviderInfo = ({ prevUrl, page, router, setModel }) => {
  const [errors, setErrors] = useState([])
  const handleUpdate = data =>
    Promise.resolve()
      .then(() => setModel(data))
      .then(() => router.push('/preferences'))
      .catch(() => setErrors(['Please fill out all required fields']))

  return (
    <FormTemplate
      {...page}
      {...router}
      onSuccess={handleUpdate}
      errors={errors}
      prevUrl={prevUrl}
    />
  )
}

const mapStateToProps = ({ survey, formState }) => ({
  page: get(survey, 'pages[5]'),
  prevUrl: get(formState, 'additionalInfo.showAdditionalContact')
    ? '/additional-contact'
    : '/additional-info'
})

export default connect(mapStateToProps, { setModel })(ProviderInfo)
