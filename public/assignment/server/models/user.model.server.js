var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByCredentials(req) {
        console.log(req + " model");
        //for (var i = 0; i < users.length; i++) {
        //    if (users[i].username == username && users[i].password == password) {
        //        callback(users[i]);
        //        return;
        //    }
        //}
    }
}