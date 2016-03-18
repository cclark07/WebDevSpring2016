var mock = require("./form.mock.json");
module.exports = function(uuid) {
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
        for (var i in mock) {
            if (mock[i].title == title) {
                return mock[i];
            }
        }
        return null;
    }

    //returns an array of forms belonging to a user whose id is equal to the userId path parameter
    function findUserFormsById(userId) {
        var userForms = [];
        for (var i in mock) {
            if (mock[i].userId == userId) {
                userForms.push(mock[i]);
            }
        }
        return userForms;
    }

    //returns a form object whose id is equal to the formId path parameter
    function findFormById(formId) {
        console.log(formId + " server model");
        for (var i in mock) {
            if (mock[i]._id == formId) {
                return mock[i];
            }
        }
        return null;
    }

    // Returns all forms
    function findAllForms() {
        return mock;
    }

    //removes a form object whose id is equal to the formId path parameter
    function deleteFormById(formId) {
        for (var i in mock) {
            if (mock[i]._id == formId) {
                mock.splice(i, 1);
            }
        }
        return mock;
    }

    //creates a new form whose properties are the same as the form object embedded in the HTTP request's
    //body and the form belongs to a user whose id is equal to the userId path parameter.
    function createFormForUser(userId, inputForm) {
        form = {
            _id: uuid.v1(),
            title: inputForm.title,
            userId: userId,
            fields: []
        };
        mock.push(form);
        return mock;
    }
    //updates a form object whose id is equal to the formId path parameter so that its properties are
    //the same as the property values of the form object embedded in the request's body
    function updateFormById(formId, form) {
        for (var i in mock) {
            if (mock[i]._id == formId) {
                mock[i] = form;
                return mock[i];
            }
        };
        return null;
    }
}