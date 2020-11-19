import {
    ApolloProvider as Provider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://social-media-merg.herokuapp.com/',
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
