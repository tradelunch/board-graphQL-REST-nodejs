const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        createdAt: String!

        posts(limit: Int = 10 offset: Int  = 0): [Post]
        comments(limit: Int = 10 offset: Int = 0): [Comment!]!
    }
    type Post {
        id: ID!
        title: String!
        content: String!
        userId: ID!
        createdAt: String!
        
        author: User!
        comments(limit: Int = 10 offset: Int = 0): [Comment!]!
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
        posts(limit: Int = 10 offset: Int = 0): [Post!]!

        user(id: ID!): User!
        users(limit: Int = 10 offset: Int = 0): [User!]!

        comment(id: ID!): Comment!
        comments(limit: Int = 10 offset: Int = 0): [Comment!]!

        count(type: IDs! = userId id: ID! model: Models!): Int!
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

    enum IDs {
        id,
        userId,
        postId,
        commentId
    }

    enum Models {
        Post,
        User,
        Comment
    }
`

module.exports = typeDefs;
