import React from 'react'
import routes from './routes'
import { createClient } from 'boiler-room-runner'
import { render } from 'react-dom'
import createStore from './store'
import 'minimal.css'
import './lib/css/global.css'

if (typeof Promise === 'undefined') {
  require('es6-promise').polyfill()
}

const basepath = process.env.BASE_PATH
const initialState = JSON.parse(
  document.getElementById('initial-state').innerHTML
)
const store = createStore(initialState)
const App = createClient({ basepath, routes, store })

render(<App />, document.getElementById('mount'))
