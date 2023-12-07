Exercises
=========

```sh
cd node
npm install
npm start
```

Surf to `http://localhost:4000` for the Apollo Dev Client.  
Code is in `node/4.confac`.



## Schema

- Implement a global search function that returns users, clients and consultants (`__typename`)
- Implement project lookup for `consultantId`
  - Add `@include(if: $withConsultant)` directive in the schema
- Implement the projectMonth schema and resolvers.



## Scalars

- Implement the `Date ScalarType` for the `Audit` type
- Save a `Consultant.telephone` as a number but display as "(0476) 40 42 46"
- Implement validation for `client.btw`

```js
// Example code for btw/iban
#> npm install --save iban

import Iban from 'iban';
Iban.isValid(client.btw)
Iban.printFormat(client.btw)

// Throw an error when it is not valid?
import { GraphQLError } from 'graphql';

throw new GraphQLError(message, {
  extensions: { code: 'INVALID_IBAN' },
});
```


## Directives

- Add a transformer for adding the `user.alias` and `client.slug` automagically (see `upperDirectiveTransformer.js`)


## Frontend

- Integrate the Apollo-Client in the React frontend instead of the current `fetch`


## Advanced

- Setup Subscriptions to listen to changes on a collection
- Setup the Apollo Router and Federation
