const Query = require('./query');
const Mutation = require('./mutation');
const { GraphQLDateTime } = require('graphql-iso-date');

// Provide resolver functions for our schema fields
module.exports = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime
};