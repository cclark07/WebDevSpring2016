var forms = require("./form.mock.json");
module.exports = function () {
    var api = {
        createFieldForForm: createFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        getFieldForForm: getFieldForForm,
        updateFieldById: updateFieldById,
        getFieldsForForm: getFieldsForForm
    };

    return api;

    function createFieldForForm(formId, field) {
        console.log(formId);
        console.log(field);
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
        console.log(formId);
    }

    function updateFieldById(formId, fieldId, field) {
        console.log(formId);
        console.log(fieldId);
        console.log(field);
    }
};