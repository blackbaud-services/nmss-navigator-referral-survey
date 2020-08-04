import React, { useEffect, useState } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Heading from 'constructicon/heading'
import Icon from 'constructicon/icon'
import { findQuestionByText } from '../../../lib/survey'
import styles, { keyframes } from './styles'
import withStyles from 'constructicon/with-styles'

const ThankYou = ({ additionalContact, answers, classNames, styles }) => {
  const [isEmail, setEmail] = useState(null)
  useEffect(() => {
    if (answers) {
      const contactId = get(findQuestionByText('/preferences', 'contactMethod'), 'id')
      setEmail(answers[`${contactId}`] === 'Email')
    }
  }, [answers])

  return (
    <div className={classNames.root}>
      <Heading>Your referral form has been submitted successfully.</Heading>
      <div className={classNames.iconWrap}>
        <Icon name='like' size={8} color='primary' styles={styles.icon} />
      </div>
      <Heading tag='h3'>Next Steps:</Heading>
      <ul className={classNames.content}>
        <li>
          Upon receipt of a referral form, an MS Navigator will be assigned to
          follow-up with the referred person{additionalContact && (<span> and/or their alternate contact</span>)}, as well as following-up with the provider specified in the "Provider Information" section of this form.
        </li>
        <li>
          The MS Navigator will reach out to the provider via an encrypted email, introducing themselves and establishing connection, as well as providing a copy of the referral for the provider's records.
        </li>
        <li>
          The MS Navigator will follow-up with the referred person {additionalContact && (<span> and/or their alternate contact</span>)} within 2 business days. Three attempts will be made to contact the
          person.
          {isEmail && (
            <ul>
              <li>
                Please advise your referred person{additionalContact && (<span> and/or their alternate contact</span>)} to look for an email with the subject line "National MS Society". If they don't see it within 2 business days, please encourage them to check their junk or spam folder. This will help ensure you patient receives the requested information via email.
              </li>
            </ul>
          )}
        </li>
        <li>
          When contact is made with the referred person{additionalContact && (<span> and/or their alternate contact</span>)},
          the MS Navigator will address their questions and needs and will assess
          if any other assistance is needed. If contact is not made, a message
          will be left requesting the person call the Society.
        </li>
        <li>
          If the MS Navigator doesn't connect with the referred person{additionalContact && (<span> and/or their alternate contact</span>)} after 3 attempts, a follow-up email will be sent to the provider asking for their help to make connection.
        </li>
        <li>
          An outcome summary describing how needs were addressed will be sent to the provider once the referral is complete. This outcome summary can take as long as 60 days from when the initial referral was made.
        </li>
        <li>
          We encourage you or the provider specified to maintain as much contact with the MS Navigator assigned to your referral as you or they would like, including checking the status of work being done with your referral.
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = ({ formState }) => {
  const { answers } = formState
  return {
    additionalContact: get(formState, 'additionalInfo.showAdditionalContact'),
    answers
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles, keyframes)
)(ThankYou)
