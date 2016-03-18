module.exports = function(app, userModel) {
    app.post("/api/assignment/user", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        res.send(user);
    }
}