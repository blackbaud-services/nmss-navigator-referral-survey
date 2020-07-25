import Route from 'route-parser'
import { auth } from './auth'
export default [
  {
    path: new Route('/auth'),
    handler: auth
  }
]
