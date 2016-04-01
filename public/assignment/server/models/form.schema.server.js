module.exports = function(mongoose) {

    var fieldSchema = require('field.schema.server.js');

    // use mongoose to declare a form schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type:String, default:'New Form'},
        fields: [fieldSchema],
        created: {type:Date, default:new Date()},
        updated: {type:Date, default:new Date()}
        // collection property sets
        // collection name to 'form'
    }, {collection: 'form'});
    return FormSchema;
};