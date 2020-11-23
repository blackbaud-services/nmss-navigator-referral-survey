import React from 'react'
import { Link } from 'react-router'
import get from 'lodash/get'
import { connect } from 'react-redux'
import Button from 'constructicon/button'
import Icon from 'constructicon/icon'
import OnePageForm from '../../forms/onePage'
import SurveyQuestion from '../../ui/SurveyQuestion'

const Intro = ({
  intro,
  router: {
    location: { query }
  },
  survey,
  ...props
}) => {
  const { onePage } = query

  return (
    <>
      {onePage ? (
        <OnePageForm
          questions={survey.surveyQuestions}
          prevUrl={null}
          nextUrl='/thank-you'
          {...survey}
          {...props}
        />
      ) : (
        <>
          <SurveyQuestion type='Caption' label={intro.questionText} />
          <Button
            tag={Link}
            to='/referral-info'
            styles={{ marginTop: '1rem' }}
          >
            <span>Next</span>
            <Icon name='chevron' />
          </Button>
        </>
      )}

    </>
  )
}

const mapStateToProps = ({ survey }) => ({
  intro: get(survey, 'pages[0].questions[0]'),
  survey
})

export default connect(mapStateToProps)(Intro)
