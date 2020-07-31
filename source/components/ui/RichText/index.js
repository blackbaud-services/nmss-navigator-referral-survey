import React from 'react'
import BaseRichText from 'constructicon/rich-text'
import withStyles from 'constructicon/with-styles'
import styles from './styles'

const RichText = ({ children, styles, ...props }) => {
  return children ? (
    <BaseRichText {...props} styles={styles}>
      {children}
    </BaseRichText>
  ) : null
}

export default withStyles(styles)(RichText)
