var mongoose = require("mongoose");

module.exports = function() {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'user'});
    return UserSchema;
};