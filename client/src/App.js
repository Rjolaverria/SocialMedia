import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import { Navbar } from './components';
import { Container } from 'semantic-ui-react';

const App = () => (
    <Router>
        <Navbar />
        <Container>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route exact path='/posts/:postId' component={Post} />
            </Switch>
        </Container>
    </Router>
);

export default App;
