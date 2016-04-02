var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    //// Uncomment and restart server to wipe User records ////
    User.remove(
        {},
        function(){
            console.log("Users Cleared");
        }
    )

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

    // Creates a new user record with the given user object
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

    // Searches the database for the user with the given id
    function getUserById(id) {
        var deferred = q.defer();
        User.findOne(
            {
                _id: id
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

    // Searches the database for the user with the given id
    // Removes the record from the database
    function deleteUserById(id) {
        var deferred = q.defer();
        User.findOneAndRemove (
                {_id: id},
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

    // Searches the database for the user with the given id
    // Updates the record with the input user object
    function updateUserById(id, user) {
        var deferred = q.defer();
        User.findOneAndUpdate(
                {_id: id},
                {$set: user},
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

    // Searches the database for the user with the given username
    function findUserByUsername(username) {
        var deferred = q.defer();
        User.findOne(
            {
                username: username
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

    // Searches the database for the user with the given credentials
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
}