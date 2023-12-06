import { graphql, buildSchema } from 'graphql'

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


graphql({
  schema,
  source: "{ hello }",
  rootValue,

  // Optional:
  contextValue: {},
  // Also: variableValues, field/TypeResolver

}).then(response => {
  console.log('response to { hello } is', response)
})
