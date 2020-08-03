import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import FormTemplate from '../../forms/template'

const PatientInfo = ({ nextUrl, page, router }) => (
  <FormTemplate
    {...page}
    {...router}
    prevUrl='/additional-info'
    nextUrl={nextUrl}
  />
)

const mapStateToProps = ({ survey, formState }) => ({
  page: get(survey, 'pages[3]'),
  nextUrl: get(formState, 'additionalInfo.showAdditionalContact')
    ? '/additional-contact'
    : '/provider-info'
})

export default connect(mapStateToProps)(PatientInfo)
