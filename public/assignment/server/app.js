module.exports = function(app, uuid, db, mongoose) {
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.server.js")(uuid, db, mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldModel = require("./models/field.model.server.js")(uuid, db, mongoose, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}