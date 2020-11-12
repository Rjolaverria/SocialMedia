import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    {
        getPosts {
            id
            body
            username
            likes {
                id
                user
            }
            likeCount
            commentCount
            dateCreated
        }
    }
`;
export const GET_POST = gql`
     query($postId: ID!) {
        getPost(postId:  $postId) {
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
            }
            likeCount
            commentCount
            dateCreated
        }
    }
`;

export const REGISTER = gql`
    mutation(
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
    mutation($username: String!, $password: String!) {
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
    mutation($body: String!) {
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

export const DELETE_POST = gql`
    mutation($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export const HANDLE_LIKE = gql`
    mutation($postId: ID!) {
        handleLike(postId: $postId) {
            id
            likes {
                id
                user
                dateCreated
            }
            likeCount
        }
    }
`;
