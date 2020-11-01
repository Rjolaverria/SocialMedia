import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import { PostCard } from '../components';
import { GET_POSTS } from '../utils/graphql';

const Home = () => {
    const { loading, data } = useQuery(GET_POSTS);
    return (
        <div>
            <Grid columns={3}>
                <Grid.Row className='page-title'>
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
