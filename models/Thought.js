const { Schema, model, Types } = require('mongoose')

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: 'Reaction is Required',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Username is Required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
},
    {
        toJSON: {
            getters: true
        },
        id: false
    });

    const ThoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: 'Thought is required',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        reactions: [ReactionSchema]
    },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            // prevents virtuals from creating duplicate of _id as 'id'
            id: false
        }
    );

    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
    });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;