module.exports = function(app) {
    var userModel = require("./models/user.model.server.js")();
    var service = require("./services/user.service.server.js")(app, userModel);
}