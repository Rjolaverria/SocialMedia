import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import { PostCard } from '../components';

const Home = () => {
    const { loading, data } = useQuery(gql`
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
                likes {
                    id
                    user
                    dateCreated
                }
                likeCount
                commentCount
            }
        }
    `);

    return (
        <div>
            <Grid columns={3}>
                <Grid.Row style={{ display: 'block', textAlign: 'center' }}>
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {loading ? (
                        <h1>Loading posts..</h1>
                    ) : (
                        data.getPosts &&
                        data.getPosts.map((post) => (
                            <Grid.Column
                                key={post.id}
                                style={{ marginBottom: 20 }}
                            >
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )}
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Home;
