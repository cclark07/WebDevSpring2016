var mongoose = require("mongoose");

module.exports = function() {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String,
        roles: [String],
        favorites: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'user'});
    return UserSchema;
};