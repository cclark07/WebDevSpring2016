var q = require("q");

module.exports = function (uuid, db, mongoose) {
    var FieldSchema = require("./field.schema.server.js")();
    var Field = mongoose.model("Field", FieldSchema);

    var Form = mongoose.model("Form");

    //// Uncomment and restart server to wipe Field records ////
    //Field.remove(
    //    {},
    //    function(){
    //        console.log("Fields Cleared");
    //    }
    //);

    var api = {
        createFieldForForm: createFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateFieldById: updateFieldById,
        getFieldsForForm: getFieldsForForm
    };

    return api;

    function createFieldForForm(formId, field) {
        var deferred = q.defer();
        //field._id = uuid.v1();

        Field.create(field,
            function (err, fieldDoc) {
                if (err) {
                    deferred.reject (err);
                } else {
                    // Find the form by the given id
                    Form.findByIdAndUpdate(
                        {
                            _id: formId
                        },
                        // Push the new field into the Forms field list
                        {$push: {fields: fieldDoc}},
                        {upsert: true, new: true},
                        function(err, formDoc) {
                            if (err) {
                                deferred.reject (err);
                            }
                            else {
                                deferred.resolve (formDoc);
                            }
                        }
                    );
                }
            });
        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();
        Form.findOne(
            {
                _id: formId
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    for (var i = 0; i < doc.fields.length; i++) {
                        if (doc.fields[i]._id == fieldId) {
                            doc.fields.splice(i, 1);
                        }
                    }
                    doc.save();
                    deferred.resolve(doc.fields);
                }
            }
        );

        return deferred.promise;
    }

    function getFieldsForForm(formId) {
        var deferred = q.defer();
        Form.findOne(
            {
                _id: formId
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc.fields);
                }
            }
        );

        return deferred.promise;
    }

    function updateFieldById(formId, fieldId, field) {
        var deferred = q.defer();
        Form.findOne(
            {_id: formId},
            function(err, doc) {
                if (!err) {
                    for (var i = 0; i < doc.fields.length; i++) {
                        if (doc.fields[i]._id == fieldId) {
                            doc.fields[i] = field; // Change not saved to database :/
                            console.log(doc); // Shows change
                            deferred.resolve(doc);
                        }
                    }
                }
                else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
        //Form.findOneAndUpdate(
        //    {_id: formId, "fields._id": fieldId},
        //    {$set: {"fields.$": field}},
        //    {new: true},
        //    function(err, doc) {
        //        if (!err) {
        //            console.log("success");
        //            console.log(doc); //Prints 'null'
        //            deferred.resolve(doc);
        //        }
        //        else {
        //            console.log("error");
        //            deferred.reject(err);
        //            console.log(err);
        //        }
        //    }
        //);
        //return deferred.promise;
    }
};