import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {useHistory} from 'react-router-dom'
import { Button, Icon, Confirm } from 'semantic-ui-react';

import {Tooltip} from '..'
import { DELETE_POST, DELETE_COMMENT } from '../../utils/graphql';

const DeleteButton = ({ postId, commentId }) => {
    const history = useHistory()
    const [confirm, setConfirm] = useState(false);

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST
    const [deleteItem] = useMutation(mutation, {
        variables: {
            postId,
            commentId
        },
        update(cache) {
            if(!commentId && postId){
                cache.modify({
                    fields: {
                        getPosts(existingPosts, { readField }) {
                            return existingPosts.filter(
                                (post) => postId !== readField('id', post)
                            );
                        },
                    },
                })
                if (history.location.pathname !== '/'){
                history.push('/')
                }
            }
            setConfirm(false);
        },
        onError(error) {
            console.error(error);
        },
    });

    return (
        <>
            <Tooltip content='Delete'>
                <Button
                    as='div'
                    color='red'
                    floated='right'
                    onClick={() => setConfirm(true)}
                >
                    <Icon name='trash' style={{ margin: 0 }} />
                </Button>
            </Tooltip>
            <Confirm
                open={confirm}
                onCancel={() => setConfirm(false)}
                onConfirm={() => deleteItem()}
            />
        </>
    );
};

export default DeleteButton;
