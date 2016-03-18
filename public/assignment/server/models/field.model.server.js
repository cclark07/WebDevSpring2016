var forms = require("./form.mock.json");
module.exports = function (uuid) {
    var api = {
        createFieldForForm: createFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        getFieldForForm: getFieldForForm,
        updateFieldById: updateFieldById,
        getFieldsForForm: getFieldsForForm
    };

    return api;

    function createFieldForForm(formId, field) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                field._id = uuid.v1();
                forms[i].fields.push(field);
                return forms[i].fields;
            }
        }
    }

    function deleteFieldFromForm(formId, fieldId) {
        var formIndex = -1;

        for (var i in forms) {
            if (forms[i]._id == formId) {
                formIndex = i;
            }
        }

        for (var j in forms[formIndex].fields) {
            if (fieldId == forms[formIndex].fields[j]._id) {
                forms[formIndex].fields.splice(j, 1);
                return forms[formIndex].fields;
            }
        }
    }

    function getFieldForForm(formId, fieldId) {
        console.log(formId);
        console.log(fieldId);
    }

    function getFieldsForForm(formId) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                return forms[i].fields;
            }
        }
    }

    function updateFieldById(formId, fieldId, field) {
        console.log(formId);
        console.log(fieldId);
        console.log(field);
    }
};