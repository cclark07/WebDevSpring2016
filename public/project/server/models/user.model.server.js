var q = require('q');

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    }

    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        User.findOne(
            {
                username: credentials.username,
                password: credentials.password
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        User.findOne(
            {
                _id: userId
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        User.find(
            function(err, users) {
                if(!err) {
                    deferred.resolve(users);
                }
                else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        User.create(user,
            function (err, doc) {
                if (err) {
                    deferred.reject (err);
                } else {
                    deferred.resolve (doc);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        User.findOneAndRemove (
            {_id: userId},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function updateUser(userId, newuser) {
        var deferred = q.defer();
        User.findOneAndUpdate(
            {_id: userId},
            {$set: newuser},
            {new: true},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }
}