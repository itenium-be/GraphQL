import { ObjectId } from '../helpers/db.cjs';

const typeDefs = `#graphql
  type ProjectClient {
    clientId: String
    advancedInvoicing: Boolean
    ref: String
  }

  type Project implements Audited {
    id: ID
    consultantId: String!
    startDate: String!
    endDate: String!
    client: ProjectClient!
    partner: ProjectClient
    audit: Audit!
  }

  extend type Query {
    project(id: ID!): Project
  }
`


export default {
  resolvers: {
    Project: {
      id: parent => parent.id ?? parent._id,
    },
    Query: {
      project: async (_, {id}, context) => {
        const result = await context.db.collection('projects').findOne({_id: new ObjectId(id)})
        return result;
      },
    },
  },
  typeDefs: [typeDefs]
}
