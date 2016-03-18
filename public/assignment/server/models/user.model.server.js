var mock = require("./user.mock.json");
module.exports = function(app) {
    var api = {
        findUserByCredentials: findUserByCredentials
    };
    return api;

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