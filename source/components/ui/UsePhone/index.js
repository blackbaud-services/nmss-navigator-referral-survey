import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import get from 'lodash/get'
import InputField from 'constructicon/input-field'
import withStyles from 'constructicon/with-styles'
import styles from './styles'
import { findQuestionByText } from '../../../lib/survey'

const UsePhone = ({ answers, form, pathname, styles }) => {
  const [phone, setPhone] = useState('')
  const phoneId = get(findQuestionByText(pathname, 'phone'), 'id')
  const refPhone = answers[`${get(findQuestionByText('/referral-info', 'phone'), 'id')}`]

  useEffect(() => {
    if (phone) {
      form.updateValues({
        [`${phoneId}`]: phone ? refPhone : ''
      })
    } else {
      form.updateValues({
        [`${phoneId}`]: ''
      })
    }
  }, [phone])

  return (
    <InputField
      autoComplete='nope'
      type='checkbox'
      label={`Please check here if the phone number is the same as the referral's phone number:`}
      name='usePhone'
      id='usePhone'
      checked={phone}
      onChange={val => setPhone(val)}
      styles={styles.input}
    />
  )
}

const mapStateToProps = ({ formState }) => ({
  answers: get(formState, 'answers')
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(UsePhone)
