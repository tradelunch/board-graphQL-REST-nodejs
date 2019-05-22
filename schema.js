const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        createdAt: String!

        posts(limit: Int offset: Int ): [Post]
        comments(limit: Int offset: Int): [Comment]
    }
    type Post {
        id: ID!
        title: String!
        content: String!
        userId: ID!
        createdAt: String!
        
        author: User!
        comments(limit: Int offset: Int): [Comment]
    }
    type Comment {
        id: ID!
        content: String!
        userId: ID!
        postId: ID!
        createdAt: String!
        
        author: User!
        post: Post
    }
    type Query {
        post(id: ID!): Post!
        posts(limit: Int offset: Int): [Post!]!

        user(id: ID!): User!
        users: [User!]!

        comment(id: ID!): Comment!
        comments: [Comment!]!

    }
    type Mutation {
        createUser(name: String!): User!

        createPost(userId: ID!, title: String!, content: String!): Post!
        updatePost(postId: ID!, title: String, content: String!): [Int!]!
        deletePost(postId: ID!): Int!

        createComment(userId: ID!, postId: ID!, content: String!): Comment!
        updateComment(commentId: ID!, content:String!): [Int!]!
        deleteComment(commentId: ID!): Int!
    }
`

module.exports = typeDefs;
