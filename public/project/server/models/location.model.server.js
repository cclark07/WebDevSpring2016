var locations = require("./location.mock.json");
module.exports = function() {

    var api = {
        getAllLocations: getAllLocations
    };

    return api;

    function getAllLocations() {
        return locations;
    }
}