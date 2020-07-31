import React, { useState } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { setModel } from '../../../store/formState'
import FormTemplate from '../../forms/template'
import { formatError } from '../../../lib/form'

const Preferences = ({ page, router, setModel }) => {
  const [errors, setErrors] = useState([])
  const handleUpdate = data =>
    Promise.resolve()
      .then(() => setModel(data))
      .then(() => router.push('/thank-you'))
      .catch(error => setErrors(formatError(error)))

  return (
    <FormTemplate
      {...page}
      {...router}
      onSuccess={handleUpdate}
      errors={errors}
      prevUrl='/provider-info'
      submit='Submit Referral'
    />
  )
}

const mapStateToProps = ({ survey }) => ({
  page: get(survey, 'pages[6]')
})

export default connect(mapStateToProps, { setModel })(Preferences)
