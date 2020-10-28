const gql = require('graphql-tag');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        dateCreated: String!
        username: String!
        comments:  [Comment]!
        commentCount: Int!
        likes: [Like]!
        likeCount: Int!
    }
    type Comment {
        id: ID!
        username: String!
        dateCreated: String!
        body: String!

    }
    type Like {
        id: ID!
        username: String!
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
        getPost(postId: String!): Post!
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
    }
`;
