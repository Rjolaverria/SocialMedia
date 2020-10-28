const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { UserInputError } = require('apollo-server');

const { validateRegistration, validateLogin } = require('../../utils/validate');
const SECRET_KEY = config.get('JWTsecret');

const tokenGen = (user) =>
    jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

module.exports = {
    Mutation: {
        // REGISTER USER
        async register(
            _,
            { input: { username, email, password, passwordConfirm } }
        ) {
            //  Validation
            const { valid, errors } = validateRegistration(
                username,
                email,
                password,
                passwordConfirm
            );
            let user = await User.findOne({ username });
            let emailCheck = await User.findOne({ email });

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            if (user) {
                throw new UserInputError('Username is already taken', {
                    errors: {
                        username: 'This username is taken',
                    },
                });
            }
            if (emailCheck) {
                throw new UserInputError('An account with this email exists', {
                    errors: {
                        username: 'An account with this email exists',
                    },
                });
            }

            user = new User({
                email,
                username,
                password,
                dateCreated: new Date(),
            });

            // Hash Password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            const res = await user.save();

            return {
                ...res._doc,
                id: res._id,
                authToken: tokenGen(res),
            };
        },
        // LOGIN USER
        async login(_, { username, password }) {
            const { valid, errors } = validateLogin(username, password);
            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = 'Invalid Credentials';
                throw new UserInputError('Invalid Credentials', { errors });
            }

            return {
                ...user._doc,
                id: user._id,
                authToken: tokenGen(user),
            };
        },
    },
};
