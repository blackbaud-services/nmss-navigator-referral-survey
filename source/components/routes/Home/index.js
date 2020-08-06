import React from 'react'
import { Link } from 'react-router'
import get from 'lodash/get'
import { connect } from 'react-redux'
import Button from 'constructicon/button'
import Icon from 'constructicon/icon'
import SurveyQuestion from '../../ui/SurveyQuestion'

const Intro = ({ intro }) => (
  <>
    {intro && (
      <SurveyQuestion type='Caption' label={intro.questionText} />
    )}
    <Button tag={Link} to='/referral-info' styles={{ marginTop: '1rem' }}>
      <span>Next</span>
      <Icon name='chevron' />
    </Button>
  </>
)

const mapStateToProps = ({ survey }) => ({
  intro: get(survey, 'pages[0].questions[0]')
})

export default connect(mapStateToProps)(Intro)
