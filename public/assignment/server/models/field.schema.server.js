var mongoose = require("mongoose");

module.exports = function() {
    // use mongoose to declare a field schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {type: String, enum: ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]},
        placeholder: String,
        options: [{label:String, value:String}]
        // collection property sets
        // collection name to 'field'
    }, {collection: 'field'});
    return FieldSchema;
};