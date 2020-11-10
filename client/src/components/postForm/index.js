import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import { AuthContext } from '../../context/authContext';
import { CREATE_POST, GET_POSTS } from '../../utils/graphql';

const PostForm = () => {
    const { user } = useContext(AuthContext);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const [createPost] = useMutation(CREATE_POST, {
        variables: { body: input },
        update(cache, result) {
            cache.modify({
                fields: {
                    getPosts(existingPosts = []) {
                        const newPost = cache.writeQuery({
                            query: GET_POSTS,
                            data: result.data.createPost,
                        });
                        return [newPost, ...existingPosts];
                    },
                },
            });
            setInput('');
            setError('');
        },
        onError(error) {
            if (error) setError(error);
        },
    });
    
    return (
        <Form onSubmit={() => createPost()} style={{ marginTop: '1rem' }}>
            <Form.Input
                type='text'
                placeholder={`What are you thinking, ${
                    user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)
                }?`}
                name='input'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                error={error.message}
            />
            <Button type='submit' color='blue'>
                Post
            </Button>
        </Form>
    );
};

export default PostForm;
