var q = require("q");

module.exports = function(uuid, db, mongoose) {
    var FormSchema = require("./form.schema.server.js")();
    var Form = mongoose.model("Form", FormSchema);

    //Form.remove(
    //    {},
    //    function(){
    //        console.log("Forms Cleared");
    //    }
    //);

    var api = {
        findFormByTitle: findFormByTitle,
        findUserFormsById: findUserFormsById,
        findFormById: findFormById,
        findAllForms: findAllForms,
        deleteFormById: deleteFormById,
        createFormForUser: createFormForUser,
        updateFormById: updateFormById
    };
    return api;

    // Returns a form whose title is equal to the input parameter, null otherwise
    function findFormByTitle(title) {
        var deferred = q.defer();
        Form.findOne(
            {
                title: title
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    //returns an array of forms belonging to a user whose id is equal to the userId path parameter
    function findUserFormsById(userId) {
        var deferred = q.defer();
        Form.find(
            {
                userId: userId
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    //returns a form object whose id is equal to the formId path parameter
    function findFormById(formId) {
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
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    // Returns all forms
    function findAllForms() {
        var deferred = q.defer();
        Form.find(
            function(err, users) {
                if(!err) {
                    deferred.resolve(users);
                }
                else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    //removes a form object whose id is equal to the formId path parameter
    function deleteFormById(formId) {
        var deferred = q.defer();
        Form.findOneAndRemove (
            {_id: formId},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    //creates a new form whose properties are the same as the form object embedded in the HTTP request's
    //body and the form belongs to a user whose id is equal to the userId path parameter.
    function createFormForUser(userId, inputForm) {
        var deferred = q.defer();

        inputForm.userId = userId;

        Form.create(inputForm,
            function (err, doc) {
                if (err) {
                    deferred.reject (err);
                } else {
                    deferred.resolve (doc);
                }
            });
        return deferred.promise;
    }
    //updates a form object whose id is equal to the formId path parameter so that its properties are
    //the same as the property values of the form object embedded in the request's body
    function updateFormById(formId, form) {
        var deferred = q.defer();
        Form.findOneAndUpdate(
            {_id: formId},
            {$set: form},
            {new: true},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }
}