import { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { Button, Card, Grid, Image, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/authContext';
import { GET_POST } from '../utils/graphql';
import { LikeButton, DeleteButton } from '../components';

const Post = (props) => {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const { data, loading } = useQuery(GET_POST, {
        variables: {
            postId,
        },
        onError(error) {
            console.error(error);
        },
    });

    return loading || !data ? (
        <p className={loading ? 'loading' : ''}></p>
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
                            <Card.Header>{data.getPost.username}</Card.Header>
                            <Card.Meta>
                                {moment(data.getPost.createdAt).fromNow()}
                            </Card.Meta>
                            <Card.Description>
                                {data.getPost.body}
                            </Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton
                                user={user}
                                post={{
                                    id: data.getPost.id,
                                    likeCount: data.getPost.likeCount,
                                    likes: data.getPost.likes,
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
                                    {data.getPost.commentCount}
                                </Label>
                            </Button>
                            {user &&
                                user.username === data.getPost.username && (
                                    <DeleteButton postId={data.getPost.id} />
                                )}
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Post;
