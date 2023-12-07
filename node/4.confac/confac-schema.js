import gql from 'graphql-tag';
import { mergeRawSchemas } from './helpers/mergeRawSchemas.cjs';

import { coreSchema } from './api/core.js';
import graphqlScalarTypes from './scalarTypes/scalarTypes.js';
import graphqlSchemaShards from './api/index.js';

// create a complete schema by merging the shards
export const confacSchema = mergeRawSchemas(
  {
    typeDefs: [
      // we create empty main types, we can later extend them in the shards
      gql`
        type Query {
          _empty: String
        }

        type Mutation {
          _empty: String
        }

        type Subscription {
          _empty: String
        }
      `
    ].concat([coreSchema]),
    resolvers: {}
  },
  graphqlSchemaShards,
  graphqlScalarTypes,
)
