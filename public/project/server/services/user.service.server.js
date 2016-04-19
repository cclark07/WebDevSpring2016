module.exports = function(app, userModel, mongoose, passport) {
    app.get("/api/project/user?username=username&password=password", findUserByCredentials);
    app.get("/api/project/user", requestRouter);
    app.post("/api/project/user", createUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.put("/api/project/user/:id", updateUser);

    var LocalStrategy = require('passport-local');
    passport.use(new LocalStrategy(localStrategy));

    function localStrategy(res) {
        console.log(res);
    }

    function requestRouter(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else {
            findAllUsers(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

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

    function updateUser(req, res) {
        var userId = req.params.id;
        var newuser = req.body;
        var updatedUser = userModel.updateUser(userId, newuser);
        res.json(updatedUser);
    }
}