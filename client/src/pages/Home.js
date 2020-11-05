import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { Grid } from 'semantic-ui-react';

import { PostCard, PostForm } from '../components';
import { AuthContext } from '../context/authContext';
import { GET_POSTS } from '../utils/graphql';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(GET_POSTS);
    return (
        <Grid columns={3}>
            {user ? (
                <Grid.Row>
                    <PostForm />
                </Grid.Row>
            ) : (
                <Grid.Row className='page-title'>
                    <h1>Recent Posts</h1>
                </Grid.Row>
            )}
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
