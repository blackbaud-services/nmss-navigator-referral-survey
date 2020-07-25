import React from 'react'
import withStyles from 'constructicon/with-styles'
import styles from './styles'

const Heading = ({ children, classNames, id, tag: Tag, ...props }) => (
  <Tag id={id} className={classNames.root} {...props}>
    {children}
  </Tag>
)

Heading.defaultProps = {
  font: 'head',
  size: 2.5,
  spacing: { y: 1 },
  tag: 'h2',
  color: 'secondary'
}

export default withStyles(styles)(Heading)
