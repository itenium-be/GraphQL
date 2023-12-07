import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { confacSchema } from './confac-schema.js';
import { connectToDatabase } from './helpers/db.cjs';

const app = express();
const httpServer = http.createServer(app);

let schema = makeExecutableSchema(confacSchema);
// Add custom directives
// import { upperDirectiveTransformer } from './helpers/upperDirectiveTransformer.js'
// schema = upperDirectiveTransformer(schema, 'upper');

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // formatError: (formattedError, error) => {
  //   return formattedError;
  // },
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const db = await connectToDatabase();
      const randomUser = await db.collection('users').findOne()
      return {
        db,
        user: {id: randomUser._id}
        // user: parseJwt(req.headers.authorization)
      }
    },
  }),
);


await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
console.log('🚀 GraphQL confac server listening to port 4000');
console.log('See node/README.md for instructions if you want to setup a local mongo');
console.log('Otherwise: check Slack for the confac-test connection string');
