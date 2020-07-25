import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Home from './components/routes/Home'
import Root from './components/routes/Root'

export default (
  <Route path='/:token' component={Root}>
    <IndexRoute component={Home} />
  </Route>
)
