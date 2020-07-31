import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { setModel, setInfo } from '../../../store/formState'
import FormTemplate from '../../forms/template'

const AdditionalContact = ({ page, router, setModel, setInfo }) => {
  const handleUpdate = data =>
    Promise.resolve()
      .then(() => setModel(data))
      .then(() => setInfo(data))

  return (
    <FormTemplate
      {...page}
      {...router}
      onSuccess={handleUpdate}
    />
  )
}

const mapStateToProps = ({ formState, survey }) => ({
  page: get(survey, 'pages[4]'),
  prevUrl: get(formState, 'additionalInfo.showPatientInfo')
    ? '/patient-info'
    : '/additional-info'
})

export default connect(mapStateToProps, { setModel, setInfo })(
  AdditionalContact
)
