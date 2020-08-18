import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import * as traits from '../../../lib/traits'
import { initAnswers, getAuth, fetchSurvey, setMode } from '../../../store'

import Container from 'constructicon/container'
import FlashMessages from './FlashMessages'
import Heading from 'constructicon/heading'
import RouteTransition from './RouteTransition'
import Section from 'constructicon/section'
import Status from '../../ui/Status'
import TraitsProvider from 'constructicon/traits-provider'

const SiteContainer = ({
  auth,
  children,
  fetchSurvey,
  initAnswers,
  getAuth,
  location: { key },
  survey: { status, surveyName },
  setMode
}) => {
  useEffect(() => {
    getAuth()
  }, [])

  useEffect(() => {
    if (auth.status === 'fetched') {
      const mode = typeof window === 'undefined' ? 'production' : get(window, 'name', 'production')

      Promise.resolve()
        .then(() => setMode(mode))
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
                <Heading
                  tag='h1'
                  spacing={{ y: 1 }}
                  children={surveyName}
                />
              )}
              <Section
                borderColor='grey'
                borderWidth={10}
                margin={0}
                styles={{ overflow: 'hidden' }}
              >
                <RouteTransition state={key}>
                  {children}
                </RouteTransition>
              </Section>
            </>
          )}
        </Container>
      </Status>
    </TraitsProvider>
  )
}

const mapStateToProps = ({ auth, survey }) => ({ auth, survey })

const mapDispatchToProps = {
  initAnswers,
  getAuth,
  fetchSurvey,
  setMode
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteContainer)
