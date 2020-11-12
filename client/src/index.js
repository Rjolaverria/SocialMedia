import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from './context/apolloContext';
import { AuthProvider } from './context/authContext';

ReactDOM.render(
    <ApolloProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ApolloProvider>,
    document.getElementById('root')
);
