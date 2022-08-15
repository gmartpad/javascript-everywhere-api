// index.ts
// This is the main entry point of our application

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

const port = process.env.PORT || 4000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  
  type Mutation {
    newNote(content: String!): Note!
  }
`;

interface INoteArgs {
  id: string
  content: string
  author: string
}

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: () => notes,
    note: (parent: any, args: INoteArgs) => {
      return notes.find(note => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent: any, args: INoteArgs) => {
      const noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };
      notes.push(noteValue)
      return noteValue
    }
  }
};

const app = express();

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen(port, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
