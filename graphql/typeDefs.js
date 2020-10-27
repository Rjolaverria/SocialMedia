const gql = require('graphql-tag');

module.exports = gql`
    type Query {
        sayHi: String!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        authToken: String!
        dateCreated: String!
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
    }
`;
