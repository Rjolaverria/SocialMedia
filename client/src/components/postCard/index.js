import {useContext} from 'react'
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../../context/authContext';
import { DeleteButton, LikeButton } from '..';
import Tooltip from '../tooltip';

const PostCard = ({
    post: { body, dateCreated, id, username, likes, likeCount, commentCount },
}) => {
    const { user } = useContext(AuthContext);
    // Format date
    dateCreated = moment.utc(Number(dateCreated)).fromNow(true);
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                />
                <Card.Header>@{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {dateCreated}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, username, likeCount, likes }} />
                <Tooltip content='Comment' >
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button basic color='blue'>
                            <Icon name='comments' />
                        </Button>
                        <Label as='a' basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </Tooltip>
                {user  && user.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    );
};

export default PostCard;
