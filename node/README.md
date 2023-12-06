GraphQL Testing Ground
======================

See root README for setting up a local Mongo with Docker and the section "Seeding random data".

Examples
--------

```sh
# Hello World example
npm run ex0

# graphql-http express server
npm run ex1
```


Frontend
--------

Simple interface to the GraphQL Server -> Mongo.

```shell
cd frontend
npm install
npm start
```



## Client

```js
import { createClient } from 'graphql-http';

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

(async () => {
  let cancel = () => {
    /* abort the request if it is in-flight */
  };

  const result = await new Promise((resolve, reject) => {
    let result;
    cancel = client.subscribe(
      {
        query: '{ hello }',
      },
      {
        next: (data) => (result = data),
        error: reject,
        complete: () => resolve(result),
      },
    );
  });

  expect(result).toEqual({ hello: 'world' });
})();
```
