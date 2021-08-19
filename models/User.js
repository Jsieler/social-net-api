const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {},
    email: {},
    thoughts: [{}],
    friend: [{}]

})
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const User = model('User', UserSchema);

module.exports = User;