// index.ts
// This is the main entry point of our application

import express, { Express } from 'express';

const app: Express = express();

app.get('/', (req, res) => res.send('Hello World!!!'));

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Server running on https://localhost:${port}`)
);
