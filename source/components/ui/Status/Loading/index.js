import React from 'react'
import withStyles from 'constructicon/with-styles'
import styles, { keyframes } from './styles'

const Loading = ({ classNames }) => (
  <div className={classNames.root}>
    <span className={classNames.dot} />
    <span className={classNames.dot} />
    <span className={classNames.dot} />
  </div>
)

export default withStyles(styles, keyframes)(Loading)
