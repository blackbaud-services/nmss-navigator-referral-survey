import React, { useState } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { setModel } from '../../../store/formState'
import FormTemplate from '../../forms/template'

const ReferralInfo = ({ page, router, setModel }) => {
  const [errors, setErrors] = useState([])
  const handleUpdate = data =>
    Promise.resolve()
      .then(() => setModel(data))
      .then(() => router.push('/additional-info'))
      .catch(() => setErrors(['Please fill out all required fields']))

  return <FormTemplate {...page} onSuccess={handleUpdate} errors={errors} />
}

const mapStateToProps = ({ survey }) => ({
  page: get(survey, 'pages[1]')
})

export default connect(mapStateToProps, { setModel })(ReferralInfo)
