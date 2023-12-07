import { ObjectId } from '../helpers/db.cjs';

const typeDefs = `#graphql
  type Consultant implements Audited {
    id: ID
    name: String!
    firstName: String!
    slug: String!
    active: Boolean!
    email: String!
    telephone: String
    audit: Audit!
  }

  extend type Query {
    consultants: [Consultant]
  }

  extend type Mutation {
    createConsultant(id: ID!): Consultant
  }
`


export default {
  resolvers: {
    Consultant: {
      id: parent => parent.id ?? parent._id,
    },
    Query: {
      consultants: async (_, __, context) => {
        const result = await context.db.collection('consultants').find().toArray()
        return result;
      },
    },
    Mutation: {
      createConsultant: async (_, consultant, context) => {
        return consultant;
      }
    }
  },
  typeDefs: [typeDefs]
}
