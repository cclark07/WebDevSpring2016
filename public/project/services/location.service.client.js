"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .factory("LocationService", LocationService);

    function LocationService() {
        var locations;

        locations = [
            {"_id": "1",
                "name": "Boston",
                "userId": 1,
                "latlon": [42, -71],
                "webcamURL": "http://test.test.test",
                "weatherURL": "http://test.test.test"
            },
            {"_id": "2",
                "name": "Weymouth",
                "userId": 1,
                "latlon": [40, -72],
                "webcamURL": "http://test.test.test",
                "weatherURL": "http://test.test.test"
            },
            {"_id": "3",
                "name": "Long Island",
                "userId": 2,
                "latlon": [40, -73],
                "webcamURL": "http://test.test.test",
                "weatherURL": "http://test.test.test"
            },
            {"_id": "4",
                "name": "Grand Cayman",
                "userId": 3,
                "latlon": [19, -81],
                "webcamURL": "http://brucesbythesea.dyndns.org:8081/en/index.html",
                "weatherURL": "http://www.wunderground.com/personal-weather-station/dashboard?ID=I90579739"
            }
        ];

        var api = {
            createLocationForUser: createLocationForUser,
            findAllLocationsForUser: findAllLocationsForUser,
            deleteLocationById: deleteLocationById,
            updateLocationById: updateLocationById,
        };

        return api;

        // Adds property called _id with a timestamp as a unique ID
        // Adds property called userId equal to user id parameter
        // Adds new location to local array of locations
        // Calls back with new location
        function createLocationForUser(userId, location, callback) {
            location._id = (new Date).getTime();
            location.userId = userId;
            locations.push(location);
            callback(location);
        }

        // Iterates over the array of current locations looking for locations whose user id is parameter user id
        // Calls back with found locations for user id parameter, empty array otherwise
        function findAllLocationsForUser(userId, callback) {
            var userLocations = [];
            for (var i = 0; i < locations.length; i++) {
                if (locations[i].userId == userId) {
                    userLocations.push(locations[i]);
                }
            };
            callback(userLocations);
        }

        // Iterates over array of locations looking for location whose id is location id parameter
        // If found, removes location from current array of locations
        // Calls back with remaining array of locations
        function deleteLocationById(locationId, callback) {
            for (var i = 0; i < locations.length; i++) {
                if (locations[i]._id == locationId) {
                    locations.splice(i, 1);
                    break;
                }
            };
            callback(locations);
        }

        // Iterates over array of locations looking for location whose id is location id parameter
        // If found, updates location object with new location values and calls back with update location
        // If not found, calls back with null
        function updateLocationById(locationId, newLocation, callback) {
            for (var i = 0; i < locations.length; i++) {
                if (locations[i]._id == locationId) {
                    locations[i] = newLocation;
                    callback(locations[i]);
                    return;
                }
            };
            callback(null);
        }
    }
})();