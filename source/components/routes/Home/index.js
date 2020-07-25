import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import RichText from 'constructicon/rich-text'

const Intro = ({ intro }) => (
  <>
    {intro && <RichText children={intro} />}
  </>
)

const mapStateToProps = ({ survey }) => ({
  intro: get(survey, 'surveyQuestions[0].questionText')
})

export default connect(mapStateToProps)(Intro)
