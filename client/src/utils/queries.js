import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!, $email: String!) {
  user(username: $username, email: $email) {
    _id
    username
    email
    posts {
      _id
      postText
    }
  }
}
`;

export const QUERY_POSTS = gql`
  query getPosts {
      posts {
        _id
        postText
        postAuthor
      }
    }
`;

export const QUERY_SINGLE_POST = gql`
query getSinglePost($postId: ID!) {
  post(postId: $postId) {
    _id
    postText
    postAuthor
    comments {
      _id
      commentText
      commentAuthor
    }
  }
}

`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    email
    posts {
      _id
      postText
      postAuthor
    }
  }
}

`;
