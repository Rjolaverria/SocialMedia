import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { DELETE_POST } from '../../utils/graphql';

const DeleteButton = ({ postId }) => {
    const [confirm, setConfirm] = useState(false);
    const [deletePost] = useMutation(DELETE_POST, {
        variables: {
            postId,
        },
        update(cache) {
            cache.modify({
                fields: {
                    getPosts(existingPosts, { readField }) {
                        return existingPosts.filter(
                            (post) => postId !== readField('id', post)
                        );
                    },
                },
            });
            setConfirm(false);
        },
        onError(error) {
            console.error(error);
        },
    });

    return (
        <>
            <Button
                as='div'
                color='red'
                floated='right'
                onClick={() => setConfirm(true)}
            >
                <Icon name='trash' style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirm}
                onCancel={() => setConfirm(false)}
                onConfirm={() => deletePost()}
            />
        </>
    );
};

export default DeleteButton;
