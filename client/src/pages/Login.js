import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';

import { LOGIN } from '../utils/graphql';

const Login = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const [registerUser, { loading }] = useMutation(LOGIN, {
        update(_, result) {
            history.push('/');
        },
        onError(error) {
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

    return (
        <>
            {Object.keys(errors).length > 0 &&
                errors.general ===
                    'Invalid Credentials' && (
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

