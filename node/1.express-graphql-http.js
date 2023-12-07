import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql'

const schema = `#graphql
type Query {
  hello: String!
  schema: String!
  random: Float!
  isDev: Boolean! @deprecated(reason: "process.env variable does not seem to be set!")
  rollDice(numDice: Int = 3, numSides: Int): [Int]
}
`

const rootValue = {
  hello: () => {
    return "Express & graphql-http server"
  },
  schema: () => {
    return schema
  },
  random: () => {
    return Math.random()
  },
  isDev: () => {
    return process.env.ENV === 'development'
  },
  rollDice: ({ numDice, numSides }) => {
    let output = []
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output
  },
}

const app = express();
app.use(cors());
app.all('/graphql', createHandler({
  schema: buildSchema(schema),
  rootValue
}));




app.listen({ port: 4000 });
console.log('🚀 GraphQL server listening to port 4000');
console.log('Test URL:');
console.log('http://localhost:4000/graphql');
console.log('');
console.log('Test "{ hello }" with Postman!');
console.log('Test "{ hello }" with the React /frontend');
console.log('cd frontend');
console.log('npm install');
console.log('npm start');
