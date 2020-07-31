import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import * as traits from '../../../lib/traits'
import { getAuth, fetchSurvey } from '../../../store'

import Container from 'constructicon/container'
import FlashMessages from './FlashMessages'
import Heading from 'constructicon/heading'
import Section from 'constructicon/section'
import Status from '../../ui/Status'
import TraitsProvider from 'constructicon/traits-provider'

const SiteContainer = ({ children, fetchSurvey, getAuth, survey }) => {
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
    // .then(() => setStatus('fetched'))
    // .catch(() => setStatus('failed'))
  }, [])

  return (
    <TraitsProvider traits={traits}>
      <Status status={status}>
        <FlashMessages />
        <Container width={35}>
          {status === 'fetched' && (
            <>
              {surveyName && <Heading tag='h1' children={surveyName} />}
              <Section borderColor='grey' borderWidth={2} margin={0}>
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

export default connect(mapStateToProps, { getAuth, fetchSurvey })(SiteContainer)
