//var forms = require("./form.mock.json");
var q = require("q");

module.exports = function (uuid, db, mongoose, formModel) {
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
        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.remove(fieldId);
                    return form.save();
                }
            );
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
        Form.findOneAndUpdate(
            {_id: formId, "fields._id": fieldId},
            {$set: {"fields.$": field}},
            {new: true},
            function(err, doc) {
                if (!err) {
                    console.log("success");
                    console.log(doc); //Prints 'null'
                    deferred.resolve(doc);
                }
                else {
                    console.log("error");
                    deferred.reject(err);
                    console.log(err);
                }
            }
        );
        return deferred.promise;

        //db.students.update(
        //    { _id: 4, "grades.grade": 85 },
        //    { $set: { "grades.$.std" : 6 } }
        //)
        //Field.findOneAndUpdate(
        //    {_id: fieldId},
        //    {$set: field},
        //    {new: true},
        //    function(err, fieldDoc) {
        //        if (!err) {
        //            var form;
        //            Form.findOne({_id: formId},
        //                function(err, doc) {
        //                    if (!err) {
        //                        form = doc;
        //                        for (var i in form.fields) {
        //                            if (form.fields[i]._id == fieldId) {
        //                                form.fields[i] = fieldDoc;
        //                                form.save();
        //                                deferred.resolve(form);
        //                            }
        //                        }
        //                    }
        //                    else {
        //                        deferred.reject(err);
        //                    }
        //                });
        //        }
        //        else {
        //            deferred.reject(err);
        //        }
        //    }
        //);

        //Field.findOneAndUpdate(
        //    {_id: fieldId},
        //    {$set: field},
        //    {new: true},
        //    function (err, stats) {
        //        if (!err) {
        //            console.log(stats);
        //            deferred.resolve(stats);
        //        } else {
        //            deferred.reject(err);
        //        }
        //    }
        //);
    }
};