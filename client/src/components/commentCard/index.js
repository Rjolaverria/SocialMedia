import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

import { DeleteButton } from '..';

const CommentCard = ({ user, postId, comment }) => {
    let { id, body, username, dateCreated } = comment;
    dateCreated = moment.utc(Number(dateCreated)).fromNow(true);
    return (
        <Card fluid>
            <Card.Content>
                {user && user.username === username && (
                    <DeleteButton postId={postId} commentId={id} />
                )}
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{dateCreated}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
        </Card>
    );
};

export default CommentCard;
