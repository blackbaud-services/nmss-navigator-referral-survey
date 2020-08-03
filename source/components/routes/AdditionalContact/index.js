import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import FormTemplate from '../../forms/template'

const AdditionalContact = ({ page, prevUrl, router }) => (
  <FormTemplate
    {...page}
    {...router}
    prevUrl={prevUrl}
    nextUrl='/provider-info'
  />
)

const mapStateToProps = ({ formState, survey }) => ({
  page: get(survey, 'pages[4]'),
  prevUrl: get(formState, 'additionalInfo.showPatientInfo')
    ? '/patient-info'
    : '/additional-info'
})

export default connect(mapStateToProps)(AdditionalContact)
