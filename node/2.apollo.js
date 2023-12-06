import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';


const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;


const resolvers = {
  Query: {
    hello: () => 'Apollo, about to make contact to mongo',
  },
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);


await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
console.log('🚀 GraphQL Apollo server listening to port 4000');
