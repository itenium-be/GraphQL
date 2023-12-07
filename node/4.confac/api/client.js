import { ObjectId } from '../helpers/db.cjs';

const typeDefs = `#graphql
  type Client implements Audited {
    id: ID
    name: String!
    slug: String!
    email: String!
    active: Boolean!
    btw: String!
    audit: Audit!
  }

  extend type Query {
    client(id: ID!): Client
  }

  extend type Mutation {
    createClient(id: ID!): Client
  }
`


export default {
  resolvers: {
    Client: {
      id: parent => parent.id ?? parent._id,
    },
    Query: {
      client: async (_, {id}, context) => {
        const result = await context.db.collection('clients').findOne({_id: new ObjectId(id)})
        return result;
      },
    },
    Mutation: {
      createClient: async (_, client, context) => {
        return client;
      }
    }
  },
  typeDefs: [typeDefs]
}
