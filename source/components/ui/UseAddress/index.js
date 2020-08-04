import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import get from 'lodash/get'
import InputField from 'constructicon/input-field'
import withStyles from 'constructicon/with-styles'
import styles from './styles'
import { findQuestionByText } from '../../../lib/survey'

const UseAddress = ({ answers, form, pathname, styles }) => {
  const [address, setAddress] = useState(false)

  useEffect(() => {
    const addressSchema = {
      [`${get(findQuestionByText(pathname, 'street'), 'id')}`]:
        address
          ? answers[`${get(findQuestionByText('/referral-info', 'street'), 'id')}`]
          : '',
      [`${get(findQuestionByText(pathname, 'street2'), 'id')}`]:
        address
          ? answers[`${get(findQuestionByText('/referral-info', 'street2'), 'id')}`]
          : '',
      [`${get(findQuestionByText(pathname, 'city'), 'id')}`]:
        address
          ? answers[`${get(findQuestionByText('/referral-info', 'city'), 'id')}`]
          : '',
      [`${get(findQuestionByText(pathname, 'state'), 'id')}`]:
        address
          ? answers[`${get(findQuestionByText('/referral-info', 'state'), 'id')}`]
          : '',
      [`${get(findQuestionByText(pathname, 'zip'), 'id')}`]:
        address
          ? answers[`${get(findQuestionByText('/referral-info', 'zip'), 'id')}`]
          : ''
    }
    form.updateValues({ ...addressSchema })
  }, [address])

  return (
    <InputField
      autoComplete='nope'
      type='checkbox'
      label={`Please check here if the address is the same as the referral's address:`}
      name='useAddress'
      id='useAddress'
      checked={address}
      onChange={val => setAddress(val)}
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
)(UseAddress)
