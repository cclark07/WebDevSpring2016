var mongoose = require("mongoose");

module.exports = function() {
    // use mongoose to declare a location schema
    var LocationSchema = mongoose.Schema({
        name: String,
        userId: String,
        lat: Number,
        lon: Number,
        webcamURL: String,
        status: String,
        comments: [{user:String,comment:String}]
        // collection property sets
        // collection name to 'location'
    }, {collection: 'location'});
    return LocationSchema;
};