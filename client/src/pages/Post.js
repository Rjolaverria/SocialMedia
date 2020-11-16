import { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import {
    Container,
    Button,
    Card,
    Grid,
    Image,
    Icon,
    Label,
} from 'semantic-ui-react';

import { AuthContext } from '../context/authContext';
import { GET_POST } from '../utils/graphql';
import { LikeButton, DeleteButton, CommentCard } from '../components';

const Post = (props) => {
    const postId = props.match.params.postId;
    const [post, setPost] = useState(null);

    const { user } = useContext(AuthContext);
    const { data, loading } = useQuery(GET_POST, {
        variables: {
            postId,
        },
        onError(error) {
            console.error(error);
        },
    });

    useEffect(() => {
        if (data) setPost(data.getPost);
    }, [data]);

    return !post ? (
        <Container text className={loading ? 'loading' : ''}>
            Loading...
        </Container>
    ) : (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Image
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        size='small'
                        float='right'
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{post.username}</Card.Header>
                            <Card.Meta>
                                {moment
                                    .utc(Number(post.dateCreated))
                                    .fromNow(true)}
                            </Card.Meta>
                            <Card.Description>{post.body}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton
                                user={user}
                                post={{
                                    id: post.id,
                                    likeCount: post.likeCount,
                                    likes: post.likes,
                                }}
                            />
                            <Button
                                as='div'
                                labelPosition='right'
                                onClick={() => console.log('Comment on post')}
                            >
                                <Button basic color='blue'>
                                    <Icon name='comments' />
                                </Button>
                                <Label basic color='blue' pointing='left'>
                                    {post.commentCount}
                                </Label>
                            </Button>
                            {user && user.username === post.username && (
                                <DeleteButton postId={post.id} />
                            )}
                        </Card.Content>
                    </Card>
                    {post.comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            postId={post.id}
                            comment={comment}
                            user={user}
                        />
                    ))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Post;
