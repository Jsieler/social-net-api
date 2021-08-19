const { Schema, model, Types } = require('mongoose')

const ThoughtSchema = new Schema({
    thoughtText: {},
    createdAt: {},
    username: {},
    reactions: [{}]
});
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const ReactionSchema = new Schema({
    reactionId: {},
    reactionBody: {},
    username: {},
    createdAt: {}
});

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;