import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import FormTemplate from '../../forms/template'

const ReferralInfo = ({ page, router, ...props }) => (
  <FormTemplate {...page} {...router} nextUrl='/additional-info' />
)

const mapStateToProps = ({ survey }) => ({
  page: get(survey, 'pages[1]')
})

export default connect(mapStateToProps)(ReferralInfo)
