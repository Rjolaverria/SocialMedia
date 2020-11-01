const userResolvers = require('./users');
const postResolvers = require('./posts');

module.exports = {
    Post: {
        likeCount: ({  likes  }) => likes.length,
        commentCount: ({  comments  }) => comments.length,
    },
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
    },
    Subscription: {
        ...postResolvers.Subscription,
    },
};
