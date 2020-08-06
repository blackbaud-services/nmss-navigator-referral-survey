import { Component } from 'react'
import { withRouter } from 'react-router'

class RouteTransition extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      console.log('scroll')
      window.scrollTo(0, 0)
    }
  }

  render () {
    return null
  }
}

export default withRouter(RouteTransition)
