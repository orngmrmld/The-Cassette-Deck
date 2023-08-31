import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
mutation AddPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      postAuthor
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation AddComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postAuthor
      comments {
        _id
        commentText
      }
    }
  }
`;
