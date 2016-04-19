var q = require('q');

var locations = require("./location.mock.json");
module.exports = function() {

    var api = {
        getAllLocations: getAllLocations,
        createLocationForUser: createLocationForUser,
        deleteLocationById: deleteLocationById,
        updateLocationById: updateLocationById,
        findAllLocationsForUser: findAllLocationsForUser,
        getLocationsByName: getLocationsByName,
        getLocationById: getLocationById
    };

    return api;

    function getAllLocations() {
        var deferred = q.defer();
        deferred.resolve(locations);
        return deferred.promise;
    }

    function createLocationForUser(userId, location) {
        location._id = (new Date).getTime();
        location.userId = userId;
        locations.push(location);

        var deferred = q.defer();
        deferred.resolve(findAllLocationsForUser(userId));
        return deferred.promise;
    }

    function findAllLocationsForUser(userId) {
        var deferred = q.defer();
        var userLocations = [];
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].userId == userId) {
                userLocations.push(locations[i]);
            }
        }
        deferred.resolve(userLocations);
        return deferred.promise;
    }

    function deleteLocationById(locationId) {
        var deferred = q.defer();
        for (var i in locations) {
            if (locations[i]._id == locationId) {
                locations.splice(i, 1);
                deferred.resolve(locations);
                return deferred.promise;
            }
        }
        deferred.reject("Location not found");
        return deferred.promise;
    }

    function updateLocationById(locationId, newLocation) {
        var deferred = q.defer();
        for (var i = 0; i < locations.length; i++) {
            if (locations[i]._id == locationId) {
                locations[i] = newLocation;
                deferred.resolve(locations[i]);
                return deferred.promise;
            }
        }
        deferred.reject("Location not found");
        return deferred.promise;
    }

    function getLocationsByName(name) {
        var deferred = q.defer();

        var result = [];
        for (var i in locations) {
            if (locations[i].name == name) {
                result.push(locations[i]);
            }
        }
        deferred.resolve(result);
        return deferred.promise;
    }

    function getLocationById(locationId) {
        var deferred = q.defer();

        for (var i = 0; i < locations.length; i++) {
            if (locations[i]._id == locationId) {
                deferred.resolve(locations[i]);
                return deferred.promise;
            }
        }
        deferred.reject("Location not found");
        return deferred.promise;
    }
}