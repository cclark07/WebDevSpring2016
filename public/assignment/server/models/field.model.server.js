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
        console.log(formId);
        console.log(fieldId);
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