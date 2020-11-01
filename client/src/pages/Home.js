import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import { PostCard } from '../components';
import { GET_POSTS } from '../utils/graphql';

const Home = () => {
    const { loading, data } = useQuery(GET_POSTS);
    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading posts..</h1>
                ) : (
                    <div className='postcards-container'>
                        {data.getPosts &&
                            data.getPosts.map((post) => (
                                <PostCard post={post} key={post.id} />
                            ))}
                    </div>
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Home;
