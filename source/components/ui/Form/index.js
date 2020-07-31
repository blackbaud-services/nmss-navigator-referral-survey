import React, { useState } from 'react'
import { Link } from 'react-router'
import { formatError } from '../../../lib/form'
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
  onSubmit,
  styles,
  submit,
  submitting,
  ...props
}) => {
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    return form.submit().then(data =>
      Promise.resolve()
        .then(() => setStatus('fetching'))
        .then(() => onSubmit(data))
        .then(() => setStatus('fetched'))
        .catch(error => {
          console.log(error, 'err')
          setStatus('failed')
          setErrors(formatError(error))
        })
    )
  }

  return (
    <BaseForm
      noValidate
      errors={errors}
      isLoading={status === 'fetching'}
      onSubmit={handleSubmit}
      styles={styles.form}
      submit={status === 'fetching' ? submitting : submit}
      {...props}
    >
      {children}
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
          disabled={status === 'fetching'}
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

Form.defaultProps = {
  submit: 'Next',
  submitting: 'Loading...'
}

export default withStyles(styles)(Form)
