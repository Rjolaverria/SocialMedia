const gql = require('graphql-tag');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        dateCreated: String!
        username: String!
        comments: [Comment]!
        commentCount: Int!
        likes: [Like]!
        likeCount: Int!
    }
    type Comment {
        id: ID!
        user: String!
        username: String!
        dateCreated: String!
        body: String!
    }
    type Like {
        id: ID!
        user: String!
        dateCreated: String!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        authToken: String!
        dateCreated: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post!
    }
    input RegisterInput {
        username: String!
        password: String!
        passwordConfirm: String!
        email: String!
    }
    type Mutation {
        register(input: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        addComment(postId: String!, body: String!): Post!
        deleteComment(postId: String!, commentId: String!): Post!
        handleLike(postId: ID!): Post!
    }
    type Subscription {
        newPost: Post!
    }
`;
