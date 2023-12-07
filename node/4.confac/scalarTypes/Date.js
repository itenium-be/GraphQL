import { GraphQLScalarType, Kind } from 'graphql'

// Scalar library:
// https://github.com/Urigo/graphql-scalars

// Docs:
// https://the-guild.dev/graphql/scalars/docs/scalars/date

export const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value) // value from the client
  },
  serialize(value) {
    return value.getTime() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value) // ast value is always in string format
    }
    return null
  }
})
