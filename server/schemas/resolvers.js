const { User, Post, Comment } = require('../models');

const resolvers = {
    Query: {
      getPosts: () => fetchPostsFromDatabase(),
      getPost: (parent, args) => fetchPostById(args.id),
    },
    Mutation: {
      createPost: (parent, args) => createNewPost(args.title, args.content),
      updatePost: (parent, args) => updatePost(args.id, args.title, args.content),
      deletePost: (parent, args) => deletePost(args.id),
    },
  };

  module.exports = resolvers;
