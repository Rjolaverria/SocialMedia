const userResolvers = require('./users');
const postResolvers = require('./posts');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
    },
};
