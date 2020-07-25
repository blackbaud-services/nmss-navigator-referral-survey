import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { clearFlashMessage } from '../../../../store/flashMessages'
import withStyles from 'constructicon/with-styles'
import styles from './styles'

import Message from './Message'

const FlashMessages = ({ classNames, clearFlashMessage, messages = [] }) => {
  if (!messages.length) {
    return null
  }

  return (
    <div className={classNames.root}>
      {messages.map((message, index) => (
        <Message
          content={message.content}
          id={message.id}
          key={message.id}
          onClose={clearFlashMessage}
          theme={message.theme}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.flashMessages.messages
})

const mapDispatchToProps = { clearFlashMessage }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(FlashMessages)
