module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:title", findFormByTitle);
    app.get("/api/assignment/user/:userId/form", findUserFormsById);
    app.get("/api/assignment/form/:formId", findFormById);
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
        var userId = req.query.userId;
        var forms = formModel.findUserFormsById(userId);
        res.json(forms);
    }

    //returns a form object whose id is equal to the formId path parameter
    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
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
        var userId = req.query.userId;
        var form = formModel.createFormForUser(userId);
        res.json(form);
    }
    //updates a form object whose id is equal to the formId path parameter so that its properties are
    //the same as the property values of the form object embedded in the request's body
    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.updateFormById(formId);
        res.json(form);
    }
}