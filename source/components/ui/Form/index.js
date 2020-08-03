import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import get from 'lodash/get'
import { setFlashMessage } from '../../../store/flashMessages'

import withStyles from 'constructicon/with-styles'
import styles from './styles'

import BaseForm from 'constructicon/form'
import ButtonGroup from 'constructicon/button-group'
import Button from 'constructicon/button'
import Icon from 'constructicon/icon'

const Form = ({
  action,
  children,
  classNames,
  form,
  isLoading,
  onSubmit,
  setFlashMessage,
  styles,
  submit,
  submitting,
  serverErrors,
  ...props
}) => {
  const [errors, setErrors] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    if (form.invalid) {
      setErrors([
        'Invalid form submission. Correct highlighted issues above and make sure all required fields are answered.'
      ])
    }
    return form.submit().then(data => onSubmit(data))
  }

  useEffect(() => {
    if (serverErrors) {
      setErrors(serverErrors)
    }
  }, [serverErrors])

  return (
    <BaseForm
      noValidate
      isLoading={isLoading}
      onSubmit={handleSubmit}
      styles={styles.form}
      submit={!isLoading ? submitting : submit}
      {...props}
    >
      {children}
      {errors.length > 0 && (
        <div className={classNames.errors}>
          {errors.map((error, i) => (
            <div key={i} className={classNames.error}>
              {error}
            </div>
          ))}
        </div>
      )}
      <ButtonGroup styles={styles.btns}>
        {action && (
          <Button
            styles={styles.btn}
            tag={Link}
            aria-label={action.label}
            title={action.label}
            {...action}
          >
            <Icon name='chevron' rotate={180} />
            <span>{action.label}</span>
          </Button>
        )}
        <Button
          styles={styles.btn}
          disabled={isLoading}
          aria-label={submit}
          title={submit}
          type='submit'
        >
          <span>{submit}</span>
          <Icon name='chevron' />
        </Button>
      </ButtonGroup>
    </BaseForm>
  )
}

const mapStateToProps = ({ survey }) => ({
  serverErrors: get(survey, 'submit.message')
})

Form.defaultProps = {
  submit: 'Next',
  submitting: 'Loading...'
}

export default compose(
  connect(mapStateToProps, { setFlashMessage }),
  withStyles(styles)
)(Form)
