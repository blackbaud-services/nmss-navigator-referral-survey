import { sendError, sendJson, loginAdmin } from '../../lib/api'

export const auth = () =>
  loginAdmin()
    .then(({ data }) => sendJson(data))
    .catch(error => sendError(`An error occurred - ${error}`))

export default { auth }
