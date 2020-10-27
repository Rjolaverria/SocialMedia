const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const config = require('config');

const DB = config.get('MongoURI');
const PORT = process.env.PORT || 5000;

// Connect to Database

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!',
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('🖥 MongoDB connected');
        return server.listen({ port: PORT });
    })
    .then((res) => console.log(`🚀 Server running @ ${res.url}`))
    .catch((err) => {
        console.error(err);
        // Exit process
        process.exit(1);
    });
