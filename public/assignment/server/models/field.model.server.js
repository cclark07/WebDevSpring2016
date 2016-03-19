var forms = require("./form.mock.json");
module.exports = function (uuid) {
    var api = {
        createFieldForForm: createFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
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

    function getFieldsForForm(formId) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                return forms[i].fields;
            }
        }
    }

    function updateFieldById(formId, fieldId, field) {
        var form = null;
        for (var i in forms) {
            if (forms[i]._id == formId) {
                form = forms[i];
            }
        }

        if (form) {
            for (var j in form.fields) {
                if (form.fields[j]._id == fieldId) {
                    form.fields[j] = field;
                    console.log(form.fields[j]);
                    return form.fields[j];
                }
            }
        }

        else {
            return null;
        }
    }
};