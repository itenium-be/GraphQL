import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';


const typeDefs = `#graphql
  type Query {
    hello: String

    """
    Chosen by fair dice roll
    **Guaranteed** to be [random](https://xkcd.com/221/)!
    """
    rollDice(
      "Amount of sides of the die"
      numSides: Int
    ): Int
  }
`;


const resolvers = {
  Query: {
    hello: () => 'Apollo, touchdown',
    rollDice: (parent, args, contextValue, info) => {
      console.log('Roll Dice:');
      console.log('parent', parent);
      console.log('args', args);
      console.log('context', contextValue);
      console.log('info', info);
      return 4;
    }
  },
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    ApolloServerPluginCacheControl({
      // Cache everything for 1 second by default.
      defaultMaxAge: 1,
      // Don't send the `cache-control` response header.
      calculateHttpHeaders: false,
    }),

    // Custom Plugin
    {
      // More server lifecycle events:
      // https://www.apollographql.com/docs/apollo-server/v2/integrations/plugins/#apollo-server-event-reference
      // requestDidStart, parsingDidStart, willSendResponse, didEncounterErrors, ...
      async serverWillStart() {
        console.log('Starting server!');
        return {
          async serverWillStop() {
            console.log('Stopping server!');
          },
        };
      },
    },
  ],
});

await server.start();



app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {lang: req.headers['accept-language'] || 'nl'}
    },
  }),
);


await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
console.log('🚀 GraphQL Apollo server listening to port 4000');
console.log('Check http://localhost:4000 for the Apollo GUI');
