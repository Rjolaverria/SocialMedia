import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import {AuthProvider} from './context/authContext'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('JWT');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client} >
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  ,
  document.getElementById('root')
);
