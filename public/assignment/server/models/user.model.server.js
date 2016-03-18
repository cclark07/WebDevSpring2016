var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        getAllUsers: getAllUsers,
        createUser: createUser,
        getUserById: getUserById,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    // Returns all available users
    function getAllUsers() {
        return mock;
    }

    // Adds property called _id with unique value (timestamp) to the user object parameter
    // Adds the new user to available users
    // Returns newly created user
    function createUser(user) {
        user._id = (new Date).getTime();
        mock.push(user);
        return mock;
    }

    // Iterates over the array of current users looking for the given id
    // If found, returns user
    // If not found, returns null
    function getUserById(id) {
        for (var i in mock) {
            if (mock[i]._id === id) {
                return mock[i];
            }
        }
        return null;
    }

    // Iterates over the array of current users looking for the given user id
    // If found, removes user from the array of users
    // Returns remaining array of all users
    function deleteUserById(id) {
        for (var i in mock) {
            if (mock[i]._id === id) {
                mock.splice(i, 1);
            }
        }
        return mock;
    }

    // Iterates over the array of current users looking for the given user id
    // If found, updates user with new user properties
    // Returns updated user or null if not found
    function updateUserById(id, user) {
        for (var i in mock) {
            if (mock[i]._id == id) {
                mock[i] = user;
                return mock[i];
            }
        };
        return null;
    }

    // Iterates over the array of current users looking for the given username
    // If found, returns user
    // If not found, returns null
    function findUserByUsername(username) {
        for (var i in mock) {
            if (mock[i].username === username) {
                return mock[i];
            }
        }
        return null;
    }

    // Iterates over the array of current users looking for user object whose
    // username and password match the given credentials then returns user found or null otherwise
    function findUserByCredentials(credentials) {
        for (var i in mock) {
            if (mock[i].username === credentials.username &&
                mock[i].password === credentials.password) {
                return mock[i];
            }
        }
        return null;
    }
}