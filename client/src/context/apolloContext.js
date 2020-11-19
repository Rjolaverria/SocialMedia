import {
    ApolloProvider as Provider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let uri =
    process.env.NODE_ENV === 'production'
        ? 'https://social-media-merg.herokuapp.com/'
        : 'http://localhost:5000';

const httpLink = createHttpLink({
    uri,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('JWT');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }) => {
    return <Provider client={client}>{children}</Provider>;
};
