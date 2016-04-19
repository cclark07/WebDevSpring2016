var q = require('q');

var users = require("./user.mock.json");
module.exports = function() {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    }

    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        for (var i in users) {
            if (users[i].username === credentials.username &&
                users[i].password === credentials.password) {
                deferred.resolve(users[i]);
                return deferred.promise;
            }
        }
        deferred.reject("Incorrect Username or password");
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        deferred.resolve(users);
        return deferred.promise;
    }

    function createUser(user) {
        user._id = (new Date).getTime();
        users.push(user);

        var deferred = q.defer();
        deferred.resolve(users);
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                deferred.resolve(users);
                return deferred.promise;
            }
        }
        deferred.reject("User not found");
        return deferred.promise;
    }

    function updateUser(userId, newuser) {
        var deferred = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users[i] = newuser;
                deferred.resolve(users[i]);
                return deferred.promise;
            }
        }
        deferred.reject("User not found");
        return deferred.promise;
    }
}