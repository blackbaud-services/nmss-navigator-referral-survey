import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import FormTemplate from '../../forms/template'

const AdditionalInfo = ({ page, router }) => {
  return (
    <FormTemplate
      {...page}
      {...router}
      prevUrl='/referral-info'
    />
  )
}

const mapStateToProps = ({ survey }) => ({
  page: get(survey, 'pages[2]')
})

export default connect(mapStateToProps)(AdditionalInfo)
