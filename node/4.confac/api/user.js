import { ObjectId } from '../helpers/db.cjs';

const typeDefs = `#graphql
  type User implements Audited {
    id: ID
    name: String!
    firstName: String!
    alias: String!
    email: String!
    active: Boolean!
    roles: [String!]!
    audit: Audit!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(name: String!, firstName: String, roles: [String]): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID! name: String, firstName: String, roles: [String]): User
  }
`



export default {
  resolvers: {
    User: {
      id: parent => parent.id ?? parent._id,
    },
    Query: {
      users: async (_, __, context) => await context.db.collection('users').find().toArray(),
      user: async (_, {id}, context) => {
        const result = await context.db.collection('users').findOne({_id: new ObjectId(id)})
        return result;
      },
    },
    Mutation: {
      createUser: async (_, {name, firstName, roles}, context) => {
        const user = {
          email: `${firstName} ${name}`.toLocaleLowerCase().replace(/\s/g, '-') + '@itenium.be',
          name,
          firstName,
          alias: name.toLowerCase().replace(/\s/g, '-'),
          active: true,
          roles,
          audit: {
            createdOn: new Date().toISOString(),
            createdBy: context.user.id,
          }
        }

        const inserted = await context.db.collection('users').insertOne(user);
        const createdUser = inserted.ops[0]
        return createdUser;
      },
      deleteUser: async (_, {id}, context) => {
        const deleteResponse = await context.db.collection('users').findOneAndUpdate({_id: new ObjectId(id)}, {$set: {active: false}});
        return !!deleteResponse.value;
      },
      updateUser: async (_, {id, name, firstName, roles}, context) => {
        // const {value: originalUser} = await context.db.collection('users')
        //   .findOneAndUpdate({_id: new ObjectId(id)}, {$set: user}, {returnOriginal: true});
      },
    }
  },
  typeDefs: [typeDefs]
}
