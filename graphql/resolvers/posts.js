const { UserInputError, AuthenticationError } = require('apollo-server');
const c = require('config');

const Post = require('../../models/Post');
const auth = require('../../utils/auth');

module.exports = {
    Query: {
        // GET all Posts
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        // GET single Post
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        // CREATE Post
        async createPost(_, { body }, context) {
            const user = auth(context);

            if (body.trim() === '') {
                throw new UserInputError("Post body cant't be empty.");
            }

            try {
                const newPost = new Post({
                    user: user.id,
                    username: user.username,
                    body,
                });

                const post = await newPost.save();
                return post;
            } catch (error) {
                throw new Error(error);
            }
        },
        // DELETE Post
        async deletePost(_, { postId }, context) {
            const user = auth(context);
            try {
                const post = await Post.findById(postId);
                if (user.id !== String(post.user)) {
                    throw new Error('Not Authorized to delete this post');
                }

                await post.delete();
                return 'Post deleted';
            } catch (error) {
                throw new Error(error);
            }
        },
        // CREATE Comment
        async addComment(_, { postId, body }, context) {
            const user = auth(context);

            if (body.trim() === '') {
                throw new UserInputError('Empty comment body', {
                    errors: {
                        body: "Comment body can't be empty",
                    },
                });
            }
            try {
                const post = await Post.findById(postId);
                if (!post) throw new UserInputError('Post not found');
                post.comments.unshift({
                    body,
                    user: user.id,
                    username: user.username,
                });
                await post.save();
                return post;
            } catch (error) {
                throw new Error(error);
            }
        },
        // Delete Comment
        async deleteComment(_, { postId, commentId }, context) {
            const user = auth(context);

            try {
                const post = await Post.findById(postId);
                if (!post) throw new UserInputError('Post not found');

                const index = post.comments.findIndex(
                    (c) => c.id === commentId
                );

                if (index === -1)throw new UserInputError('Comment not found');
                
                if (String(post.comments[index].user) !== user.id) {
                    throw new AuthenticationError('Not Authorized');
                }

                post.comments.splice(index, 1);
                await post.save();
                return post;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};
