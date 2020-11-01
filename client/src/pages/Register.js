import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

import { REGISTER } from '../utils/graphql';

const Register = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const [registerUser, { loading }] = useMutation(REGISTER, {
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
        <Form
            onSubmit={onSubmit}
            className={loading ? 'loading' : ''}
            noValidate
        >
            <h1>Register</h1>
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
                type='email'
                label='Email'
                placeholder='Email'
                name='email'
                value={inputs.email}
                onChange={onChange}
                error={errors.email}
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
            <Form.Input
                type='password'
                label='Confirm Password'
                placeholder='Confirm Password'
                name='passwordConfirm'
                value={inputs.passwordConfirm}
                onChange={onChange}
            />
            <Button type='submit' color='blue'>
                Register
            </Button>
        </Form>
    );
};

export default Register;
