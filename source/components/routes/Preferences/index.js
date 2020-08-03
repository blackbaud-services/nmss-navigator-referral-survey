import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import FormTemplate from '../../forms/template'

const Preferences = ({ page, router }) => (
  <FormTemplate
    {...page}
    {...router}
    prevUrl='/provider-info'
    nextUrl='/thank-you'
    submit='Submit Referral'
  />
)

const mapStateToProps = ({ survey }) => ({
  page: get(survey, 'pages[6]')
})

export default connect(mapStateToProps)(Preferences)
