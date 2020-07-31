import React, { useEffect, useState } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { setModel } from '../../../store/formState'
import FormTemplate from '../../forms/template'

const ReferralInfo = ({ page, router, setModel }) => {
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)
  const handleUpdate = data => {
    console.log('submit')
    return Promise.resolve()
      .then(() => setModel(data, router))
      .then(() => setStatus('success'))
      .catch(error => {
        console.log(error)
        setStatus('failed')
        setErrors(['Please fill out all required fields'])
      })
  }

  useEffect(() => {
    if (status === 'success') {
      router.push('/additional-info')
    }
  }, [status])

  return (
    <FormTemplate
      {...page}
      {...router}
      status={status}
      onSuccess={handleUpdate}
      errors={errors}
    />
  )
}

const mapStateToProps = ({ survey }) => ({
  page: get(survey, 'pages[1]')
})

export default connect(mapStateToProps, { setModel })(ReferralInfo)
