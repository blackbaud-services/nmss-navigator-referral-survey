import React from 'react'
import withStyles from 'constructicon/with-styles'
import styles from './styles'
import Icon from 'constructicon/icon'

const ErrorStatus = ({
  children = 'There was an unexpected error',
  classNames
}) => (
  <div className={classNames.root}>
    <Icon name='warning' size={2} />
    <div className={classNames.label}>{children}</div>
  </div>
)

export default withStyles(styles)(ErrorStatus)
