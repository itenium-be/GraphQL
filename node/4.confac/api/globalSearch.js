import { ObjectId } from '../helpers/db.cjs';

// How to query a Union?
// https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces#querying-a-union

// query Search {
//   search(needle: "Goodwin") {
//     __typename
//     ... on Client {
//       name
//     }
//     ... on Consultant {
//       name
//       firstName
//     }
//     ... on User {
//       name
//       firstName
//     }
//   }
// }


const typeDefs = `#graphql
  union SearchItem = User | Consultant | Client

  extend type Query {
    search(needle: String!): [SearchItem]
  }
`


export default {
  resolvers: {
    SearchItem: {
      __resolveType(obj, contextValue, info) {
        if (obj.roles)
          return 'User';

        if (obj.btw)
          return 'Client';

        if (obj.telephone)
          return 'Consultant';

        return null; // == GraphQLError
      },
    },
    Query: {
      search: async (_, {needle}, context) => {
        const result = await context.db.collection('consultants').find({name: needle}).toArray()
        return result;
      },
    },
  },
  typeDefs: [typeDefs]
}
