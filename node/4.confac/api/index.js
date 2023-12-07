import { mergeRawSchemas } from '../helpers/mergeRawSchemas.cjs'

import user from './user.js'
import client from './client.js'
import consultant from './consultant.js'
import project from './project.js'
import globalSearch from './globalSearch.js'


export default mergeRawSchemas(
  user,
  project,
  // role,
  // config,
  consultant,
  client,
  // invoices,
  // attachment,
  // projects_month,
  globalSearch,
)
