import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import * as traits from '../../../lib/traits'
import { initAnswers, getAuth, fetchSurvey } from '../../../store'

import Container from 'constructicon/container'
import FlashMessages from './FlashMessages'
import Heading from 'constructicon/heading'
import Section from 'constructicon/section'
import Status from '../../ui/Status'
import TraitsProvider from 'constructicon/traits-provider'

const SiteContainer = ({
  children,
  fetchSurvey,
  initAnswers,
  getAuth,
  survey
}) => {
  const { status, surveyName } = survey
  useEffect(() => {
    const token = typeof window === 'undefined' ? null : get(window, 'name')
    Promise.resolve()
      .then(() => getAuth(token))
      .then(auth =>
        fetchSurvey(
          !token || token === 'null' ? { sso_auth_token: auth } : { auth }
        )
      )
      .then(({ surveyQuestions }) => initAnswers(surveyQuestions))
      .catch(error => console.error(error))
  }, [])

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

const mapStateToProps = ({ survey }) => ({ survey })

export default connect(mapStateToProps, { initAnswers, getAuth, fetchSurvey })(
  SiteContainer
)
