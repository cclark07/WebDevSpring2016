var locations = require("./location.mock.json");
module.exports = function() {

    var api = {
        getAllLocations: getAllLocations,
        createLocationForUser: createLocationForUser,
        deleteLocationById: deleteLocationById,
        updateLocationById: updateLocationById,
        findAllLocationsForUser: findAllLocationsForUser
    };

    return api;

    function getAllLocations() {
        return locations;
    }

    function createLocationForUser(userId, location) {
        location._id = (new Date).getTime();
        location.userId = userId;
        locations.push(location);
        var userLocations = findAllLocationsForUser(userId);
        return userLocations;
    }

    function findAllLocationsForUser(userId) {
        var userLocations = [];
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].userId == userId) {
                userLocations.push(locations[i]);
            }
        };
        return userLocations;
    }

    function deleteLocationById(locationId) {
        for (var i in locations) {
            if (locations[i]._id == locationId) {
                locations.splice(i, 1);
                break;
            }
        };
        return locations;
    }

    function updateLocationById(locationId, newLocation) {
        for (var i = 0; i < locations.length; i++) {
            if (locations[i]._id == locationId) {
                locations[i] = newLocation;
                return locations[i];
            }
        };
    }
}