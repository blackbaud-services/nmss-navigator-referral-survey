import { createServer } from 'boiler-room-runner'
import { updateClient } from 'supporticon/utils/client'
import renderDocument from '../lib/renderDocument'
import createStore from '../store'
import routes from '../routes'
import serverRoutes from './routes'

updateClient({ baseURL: process.env.SUPPORTICON_BASE_URL })

const basepath = process.env.BASE_PATH

export default ({ assets, ...props }) => {
  const serverApp = (currentPath = '/', request) => {
    const currentRoute = serverRoutes.find(({ path }) =>
      path.match(currentPath)
    )

    if (currentRoute) {
      const { path, handler } = currentRoute
      return handler(path.match(currentPath), request)
    }

    const store = createStore()

    const app = createServer({
      assets,
      basepath,
      renderDocument,
      routes,
      store
    })

    return app(currentPath)
  }

  serverApp.staticRoutes = ['/']

  return serverApp
}

export { renderDocument }
