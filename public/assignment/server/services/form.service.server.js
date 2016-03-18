module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:title", findFormByTitle);
    app.get("/api/assignment/user/:userId/form", findUserFormsById);
    app.get("/api/assignment/form/:formId", findFormById);
    app.get("/api/assignment/form/", findAllForms);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    //returns a form object whose title is equal to the title path parameter
    function findFormByTitle(req, res) {
        var formTitle = req.query.title;
        var form = formModel.findFormByTitle(formTitle);
        res.json(form);
    }

    //returns an array of forms belonging to a user whose id is equal to the userId path parameter
    function findUserFormsById(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findUserFormsById(userId);
        res.json(forms);
    }

    //returns a form object whose id is equal to the formId path parameter
    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function findAllForms(req, res) {
        var forms = formModel.findAllForms();
        res.json(forms);
    }

    //removes a form object whose id is equal to the formId path parameter
    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.json(forms);
    }

    //creates a new form whose properties are the same as the form object embedded in the HTTP request's
    //body and the form belongs to a user whose id is equal to the userId path parameter.
    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var inputForm = req.body;
        var form = formModel.createFormForUser(userId, inputForm);
        res.json(form);
    }
    //updates a form object whose id is equal to the formId path parameter so that its properties are
    //the same as the property values of the form object embedded in the request's body
    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var form = formModel.updateFormById(formId, newForm);
        res.json(form);
    }
}