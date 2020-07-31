import React, { useState, useEffect } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { setModel, setInfo } from '../../../store/formState'
import FormTemplate from '../../forms/template'

const AdditionalInfo = ({ formState, page, router, setModel, setInfo }) => {
  const { additionalInfo } = formState
  const [status, setStatus] = useState(null)
  const handleUpdate = data =>
    Promise.resolve()
      .then(() => setModel(data, router))
      .then(() => setInfo(data))
      .then(() => setStatus('success'))
      .catch(error => console.log(error))

  useEffect(() => {
    if (status === 'success') {
      router.push(
        additionalInfo.showPatientInfo
          ? '/patient-info'
          : additionalInfo.showAdditionalContact
            ? '/additional-contact'
            : '/provider-info'
      )
    }
  }, [status])

  return (
    <FormTemplate
      {...page}
      {...router}
      onSuccess={handleUpdate}
      prevUrl='/referral-info'
    />
  )
}

const mapStateToProps = ({ formState, survey }) => ({
  formState,
  page: get(survey, 'pages[2]')
})

export default connect(mapStateToProps, { setModel, setInfo })(AdditionalInfo)
