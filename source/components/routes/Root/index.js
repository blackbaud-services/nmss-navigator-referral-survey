import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as traits from '../../../lib/traits'
import { initAnswers, getAuth, fetchSurvey } from '../../../store'

import Container from 'constructicon/container'
import FlashMessages from './FlashMessages'
import Heading from 'constructicon/heading'
import Section from 'constructicon/section'
import Status from '../../ui/Status'
import TraitsProvider from 'constructicon/traits-provider'

const SiteContainer = ({
  auth,
  children,
  fetchSurvey,
  initAnswers,
  getAuth,
  survey: { status, surveyName }
}) => {
  useEffect(() => {
    getAuth()
  }, [])

  useEffect(() => {
    if (auth.status === 'fetched') {
      Promise.resolve()
        .then(() => fetchSurvey(auth))
        .then(({ surveyQuestions }) => initAnswers(surveyQuestions))
        .catch(error => console.error(error))
    }
  }, [auth])

  return (
    <TraitsProvider traits={traits}>
      <Status status={status}>
        <FlashMessages />
        <Container width={35}>
          {status === 'fetched' && (
            <>
              {surveyName && (
                <Heading tag='h1' spacing={{ y: 1 }} children={surveyName} />
              )}
              <Section
                borderColor='grey'
                borderWidth={5}
                margin={0}
              >
                {children}
              </Section>
            </>
          )}
        </Container>
      </Status>
    </TraitsProvider>
  )
}

const mapStateToProps = ({ auth, survey }) => ({ auth, survey })

export default connect(mapStateToProps, { initAnswers, getAuth, fetchSurvey })(
  SiteContainer
)
