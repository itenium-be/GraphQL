import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { confacSchema } from '../frontend/schema/confac-schema.js';
import { connectToDatabase, ObjectId } from './db.cjs';

const resolvers = {
  User: {
    id: parent => parent.id ?? parent._id,
  },
  Query: {
    hello: () => 'Apollo, about to make contact to mongo',
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
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: confacSchema,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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
