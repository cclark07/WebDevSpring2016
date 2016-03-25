var locations = require("./location.mock.json");
module.exports = function() {

    var api = {
        getAllLocations: getAllLocations,
        createLocationForUser: createLocationForUser
    };

    return api;

    function getAllLocations() {
        return locations;
    }

    function createLocationForUser(userId, location) {
        location._id = (new Date).getTime();
        location.userId = userId;
        locations.push(location);
        return location;
    }
}