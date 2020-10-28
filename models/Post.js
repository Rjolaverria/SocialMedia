const { model, Schema } = require('mongoose');
const userObject = {
    type: Schema.Types.ObjectId,
    ref: 'users-merng',
};

const PostSchema = new Schema({
    user: userObject,
    username: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
    likes: [
        {
            user: userObject,
            dateCreated: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    comments: [
        {
            user: userObject,
            username: String,
            body: {
                type: String,
                required: true,
            },
            dateCreated: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('merng-posts', PostSchema);
