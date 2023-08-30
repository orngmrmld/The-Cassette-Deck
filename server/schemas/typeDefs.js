const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    posts: [Post]
  }

  type Post {
    _id: ID!
    description: String!
    content: String!
    comments: [Comment]

  }
 
  type Comment {
    _id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type Query {
    user: [User]
    post: [Post]
    comment: [Comment]
    
  }
`;

module.exports = typeDefs;
