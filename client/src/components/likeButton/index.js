import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Button, Label, Icon } from 'semantic-ui-react';

import { HANDLE_LIKE } from '../../utils/graphql';

const LikeButton = ({ user, post: { likes, likeCount, username, id } }) => {
    const history = useHistory();
    const [liked, setLike] = useState(true);
    const [handleLike] = useMutation(HANDLE_LIKE, {
        variables: { postId: id },
        onError(error) {
            if (error && !user) {
                history.push('/login');
            }
        },
    });

    useEffect(() => {
        if (user && likes.find((like) => like.user === user.id)) {
            setLike(true);
        } else setLike(false);
    }, [user, likeCount, likes]);

    return (
        <Button as='div' labelPosition='right' onClick={handleLike}>
            {user && liked ? (
                <Button color='red'>
                    <Icon name='heart' />
                </Button>
            ) : (
                <Button color='red' basic>
                    <Icon name='heart' />
                </Button>
            )}
            <Label as='a' basic color='red' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    );
};

export default LikeButton;
