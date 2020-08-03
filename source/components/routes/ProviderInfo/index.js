import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import FormTemplate from '../../forms/template'

const ProviderInfo = ({ prevUrl, page, router }) => (
  <FormTemplate
    {...page}
    {...router}
    prevUrl={prevUrl}
    nextUrl={'preferences'}
  />
)

const mapStateToProps = ({ formState, survey }) => ({
  page: get(survey, 'pages[5]'),
  prevUrl: get(formState, 'additionalInfo.showAdditionalContact')
    ? '/additional-contact'
    : '/additional-info'
})

export default connect(mapStateToProps)(ProviderInfo)
