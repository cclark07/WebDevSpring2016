var users = require("./user.mock.json");
module.exports = function() {

    var api = {
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    }

    return api;

    function findAllUsers() {
        return users;
    }

    function createUser(user) {
        user._id = (new Date).getTime();
        users.push(user);
        return users;
    }

    function deleteUser(userId) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                break;
            }
        };
        return users;
    }

    function updateUser(userId, newuser) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users[i] = newuser;
                return users[i];
            }
        };
    }
}