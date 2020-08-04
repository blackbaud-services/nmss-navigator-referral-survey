import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import SubmitForm from '../../forms/submit'

const Preferences = ({ page, router }) => (
  <SubmitForm {...page} {...router} />
)

const mapStateToProps = ({ survey }) => ({
  page: get(survey, 'pages[6]')
})

export default connect(mapStateToProps)(Preferences)
