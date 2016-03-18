module.exports = function(app, fieldModel) {
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    //creates a new field whose properties are the same as the field object embedded in the
    //request's body and the field belongs to a form whose id is equal to the formId path parameter.
    function createFieldForForm(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        field = fieldModel.createFieldForForm(formId, field);
        res.json(field);
    }

    //returns an array of fields belonging to a form object whose id is equal to the formId path parameter
    function getFieldsForForm(req, res) {
        var formId = req.params.formId;;
        var fields = fieldModel.getFieldsForForm(formId);
        res.json(fields);
    }

    //returns a field object whose id is equal to the fieldId path parameter and belonging to a
    //form object whose id is equal to the formId path parameter
    function getFieldForForm(req, res) {
        var formId = req.params.formId;;
        var fieldId = req.params.fieldId;;
        var field = fieldModel.getFieldForForm(formId, fieldId);;
        res.json(field);
    }

    //removes a field object whose id is equal to the fieldId path parameter and belonging
    //to a form object whose id is equal to the formId path parameter
    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;;
        var fieldId = req.params.fieldId;;
        var fields = fieldModel.deleteFieldFromForm(formId, fieldId);
        res.json(fields);
    }

    //updates a field object whose id is equal to the fieldId path parameter and belonging
    //to a form object whose id is equal to the formId path parameter so that its properties
    //are the same as the property values of the field object embedded in the request's body
    function updateFieldById(req, res) {
        var fieldId = req.body;;
        var formId = req.params.fieldId;;
        var field = req.params.formId;;
        var fields = fieldModel.updateFieldById(formId, fieldId, field);
        res.json(fields);
    }
};