import React, { Component } from 'react'
import withStyles from 'constructicon/with-styles'
import styles, { keyframes } from './styles'

import Icon from 'constructicon/icon'

class Message extends Component {
  constructor () {
    super()
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount () {
    this.closeTimeout = setTimeout(this.handleClose, 7500)
  }

  componentWillUnmount () {
    clearTimeout(this.closeTimeout)
  }

  handleClose () {
    this.props.onClose(this.props.id)
    clearTimeout(this.closeTimeout)
  }

  render () {
    const { classNames, content } = this.props

    return (
      <div className={classNames.root}>
        <div className={classNames.content}>{content}</div>
        <button className={classNames.close} onClick={this.handleClose}>
          <Icon name='close' size={0.75} />
        </button>
      </div>
    )
  }
}

export default withStyles(styles, keyframes)(Message)
