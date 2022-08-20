// index.ts
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const db = require('./db');

const models = require('./models');
const { model } = require('mongoose');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST

const notes = async () => {
  return models.Note.find();
};

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

// interface INoteArgs {
//   id: string
//   content: string
//   author: string
// }

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: async () => models.Note.find(),
    note: async (parent, args) => {
      return models.Note.findById(args.id);
    },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return models.Note.create({
        content: args.content,
        author: 'Adam Scott'
      })
    }
  }
};

const app = express();

// Connect to the database
db.connect(DB_HOST)

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen(port, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
