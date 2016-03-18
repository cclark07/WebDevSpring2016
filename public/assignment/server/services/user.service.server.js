module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", requestRouter);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function requestRouter(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if (req.query.username) {
            getUserByUsername(req, res);
        }
        else {
            getAllUsers(req, res);
        }
    }

    //creates a new user embedded in the body of the request
    //Responds with an array of all users
    function createUser(req, res) {
        var newUser = req.body;
        var users = userModel.createUser(newUser);
        res.json(users);
    }

    //responds with an array of all users
    function getAllUsers(req, res) {
        res.json(userModel.getAllUsers());
    }

    //responds with a single user whose id property is equal to the id path parameter
    function getUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.getUserById(userId);
        res.json(user);
    }

    //responds with a single user whose username property is equal to the username path parameter
    function getUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    //responds with a single user whose username property is equal to the username path
    //parameter and its password is equal to the password path parameter
    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    //updates an existing user whose id property is equal to the id path parameter.
    //The new properties are set to the values in the user object embedded in the HTTP request.
    //Responds with an array of all users
    function updateUserById(req, res) {
        var user = req.body;
        var userId = req.params.id;
        res.json(userModel.updateUserById(userId, user));
    }

    //removes an existing user whose id property is equal to the id path parameter.
    //Responds with an array of all users
    function deleteUserById(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }
}