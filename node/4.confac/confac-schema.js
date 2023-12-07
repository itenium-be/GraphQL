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


// TODO: createdBy: id->name --> resolveCreatedByToAlias : https://graphql.org/graphql-js/object-types/

// TODO: @graphql-tools for Date with custom scalar? --> https://stackoverflow.com/a/49694083/540352
// @skip(if: false)  // @include(if: $includeAudit)

// Subscriptions?

// TODO: https://elfi-y.medium.com/apollo-graphql-custom-directives-2b6c3f1cbc75 --> custom directive for Date

// TODO: global search:
// https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces#example
// __typename
