// import { readFileSync } from 'fs';
// const typeDefs = readFileSync('schema.graphql', 'UTF8');

export const confacSchema = `#graphql
  type Audit {
    createdOn: String!
    createdBy: String!
    modifiedOn: String
    modifiedBy: String
  }

  interface Audited {
    audit: Audit!
  }

  type User implements Audited {
    id: ID!
    name: String!
    firstName: String!
    alias: String!
    email: String!
    active: Boolean!
    roles: [String!]!
    audit: Audit!
  }

  type Query {
    hello: String!
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, firstName: String, roles: [String]): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID! name: String, firstName: String, roles: [String]): User
  }
`
