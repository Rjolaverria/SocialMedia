const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('config');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const DB = config.get('MongoURI');
const PORT = process.env.PORT || 5000;

const pubsub = new PubSub();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
});

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log(`🖥  MongoDB connected`);
        return server.listen({ port: PORT });
    })
    .then((res) => console.log(`🚀 Server running @ ${res.url}`))
    .catch((err) => {
        console.error(err);
    });
