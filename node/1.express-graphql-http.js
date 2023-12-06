import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => {
    return "Hello world!"
  },
}

const app = express();
app.use(cors());
app.all('/graphql', createHandler({
  schema,
  rootValue
}));




app.listen({ port: 4000 });
console.log('GraphQL server listening to port 4000');
console.log('Test URL:');
console.log('http://localhost:4000/graphql');
console.log('');
console.log('Test "{ hello }" with Postman!');
console.log('Test "{ hello }" with the React /frontend');
console.log('cd frontend');
console.log('npm install');
console.log('npm start');
