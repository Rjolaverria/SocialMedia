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
