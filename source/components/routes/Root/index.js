import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as traits from '../../../lib/traits'
import { getAuth, fetchSurvey } from '../../../store'

import Container from 'constructicon/container'
import FlashMessages from './FlashMessages'
import Heading from 'constructicon/heading'
import Section from 'constructicon/section'
import Status from '../../ui/Status'
import TraitsProvider from 'constructicon/traits-provider'

const SiteContainer = ({
  children,
  fetchSurvey,
  getAuth
}) => {
  const [status, setStatus] = useState('fetching')
  const token = typeof window === 'undefined' ? null : window.frames.frameElement.dataset.token
  useEffect(() => {
    Promise.resolve()
      .then(() => token && getAuth(token))
      .then(auth => fetchSurvey(token === 'null' ? { sso_auth_token: auth } : { auth }))
      .then(() => setStatus('fetched'))
      .catch(() => setStatus('failed'))
  }, [])
  return (
    <TraitsProvider traits={traits}>
      <Status status={status}>
        <FlashMessages />
        <Container width={30}>
          <Heading tag='h1'>
            National MS Society Referral Form for Providers
          </Heading>
          {status === 'fetched' && (
            <Section borderColor='grey' borderWidth={2} margin={0}>
              {children}
            </Section>
          )}
        </Container>
      </Status>
    </TraitsProvider>
  )
}

export default connect(null, { getAuth, fetchSurvey })(SiteContainer)
