module.exports = function(app, uuid, mongoose, passport) {
    var userModel = require("./models/user.model.server.js")();
    var userService = require("./services/user.service.server.js")(app, userModel, mongoose, passport);

    var locationModel = require("./models/location.model.server.js")();
    var locationService = require("./services/location.service.server.js")(app, locationModel);
}