import React, { Component } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import withStyles from 'constructicon/with-styles'
import styles from './styles'

class RouteTransition extends Component {
  constructor () {
    super()
    this.state = {
      animate: true
    }
  }

  componentWillUpdate (nextProps) {
    // Trigger animation
    if (nextProps.state !== this.props.state) {
      window.scrollTo(0, 0)
      this.setState({ animate: false })
      setTimeout(() => this.setState({ animate: true }), 500)
    }
  }

  render () {
    const {
      children,
      classNames,
      state
    } = this.props

    return (
      <SwitchTransition>
        <CSSTransition
          key={state}
          in={this.state.animate}
          timeout={500}
          classNames={{
            enter: classNames.enter,
            enterActive: classNames.enterActive,
            exit: classNames.exit,
            exitActive: classNames.exitActive
          }}>
          <div data-state={state} id={state}>
            {children}
          </div>
        </CSSTransition>
      </SwitchTransition>
    )
  }
}

export default withStyles(styles)(RouteTransition)
