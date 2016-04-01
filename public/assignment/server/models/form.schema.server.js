var mongoose = require("mongoose");

module.exports = function() {
    var fieldSchema = require('./field.schema.server.js');

    // use mongoose to declare a form schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type:String, default:'New Form'},
        fields: [{type:mongoose.Schema.Types.Object, ref:'field'}],
        created: {type:Date, default:new Date()},
        updated: {type:Date, default:new Date()}
        // collection property sets
        // collection name to 'form'
    }, {collection: 'form'});
    return FormSchema;
};