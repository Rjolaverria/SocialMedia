import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    {
        getPosts {
            id
            body
            username
            comments {
                id
                username
                body
                dateCreated
            }
            likeCount
            commentCount
            dateCreated
        }
    }
`;

export const REGISTER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $passwordConfirm: String!
    ) {
        register(
            input: {
                username: $username
                email: $email
                password: $password
                passwordConfirm: $passwordConfirm
            }
        ) {
            id
            email
            authToken
            username
            dateCreated
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            authToken
            username
            dateCreated
        }
    }
`;


export const CREATE_POST = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            username
            comments {
                id
                username
                body
                dateCreated
            }
            likes {
                id
                user
                dateCreated
            }
            likeCount
            commentCount
        }
    }
`;