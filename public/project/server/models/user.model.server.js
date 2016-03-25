var users = require("./user.mock.json");
module.exports = function() {

    var api = {
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUser: deleteUser
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
            console.log(users[i]._id + ", " + userId);
            if (users[i]._id == userId) {
                users.splice(i, 1);
                break;
            }
        };
        return users;
    }
}