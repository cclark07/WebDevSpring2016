module.exports = function(app, userModel) {
    app.get("/api/project/user", findAllUsers);
    app.post("/api/project/user", createUser);
    app.delete("/api/project/user/:id", deleteUser);

    function findAllUsers(req, res) {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function createUser(req, res) {
        var user = req.body
        var users = userModel.createUser(user);
        res.json(users);
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUser(userId);
        res.json(users);
    }
}