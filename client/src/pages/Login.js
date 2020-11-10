import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';

import { AuthContext } from '../context/authContext';
import { LOGIN } from '../utils/graphql';

const Login = () => {
    const authContext = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const [registerUser, { loading }] = useMutation(LOGIN, {
        update(_, result) {
            authContext.login(result.data.login);
        },
        onError(error) {
            if (error.graphQLErrors[0])
                setErrors(error.graphQLErrors[0].extensions.errors);
        },
        variables: inputs,
    });

    const onChange = (e) =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        registerUser();
    };

    if (authContext.user) {
        return <Redirect to='/' />;
    }

    return (
        <>
            {Object.keys(errors).length > 0 && (
                <Message negative>{errors.general}</Message>
            )}
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>Login</h1>
                <Form.Input
                    type='text'
                    label='Username'
                    placeholder='Username'
                    name='username'
                    value={inputs.username}
                    onChange={onChange}
                    error={errors.username}
                />
                <Form.Input
                    type='password'
                    label='Password'
                    placeholder='Password'
                    name='password'
                    value={inputs.password}
                    onChange={onChange}
                    error={errors.password}
                />
                <Button type='submit' color='blue'>
                    Login
                </Button>
            </Form>
        </>
    );
};

export default Login;

