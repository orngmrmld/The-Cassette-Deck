const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String
  }

  type Post {
    _id: ID!

  }
 
  type Comment {
    _id: ID!
  }

  type Query {
    user: [User]
    post: [Post]
    comment: [Comment]
    
  }
`;

module.exports = typeDefs;
