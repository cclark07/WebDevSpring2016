"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .factory("LocationService", LocationService);

    function LocationService($http) {
        var locations;

        locations = [
            {"_id": "1",
                "name": "Boston",
                "userId": 1,
                "latlon": [42, -71],
                "webcamURL": "http://test.test.test",
                "weatherURL": "http://test.test.test",
                "status": "Open"
            },
            {"_id": "2",
                "name": "Weymouth",
                "userId": 1,
                "latlon": [40, -72],
                "webcamURL": "http://test.test.test",
                "weatherURL": "http://test.test.test",
                "status": "Declined"
            },
            {"_id": "3",
                "name": "Long Island",
                "userId": 2,
                "latlon": [40, -73],
                "webcamURL": "http://test.test.test",
                "weatherURL": "http://test.test.test",
                "status": "Open"
            },
            {"_id": "4",
                "name": "Grand Cayman",
                "userId": 3,
                "latlon": [19, -81],
                "webcamURL": "http://brucesbythesea.dyndns.org:8081/en/index.html",
                "weatherURL": "http://www.wunderground.com/personal-weather-station/dashboard?ID=I90579739",
                "status": "Approved"
            }
        ];

        var api = {
            createLocationForUser: createLocationForUser,
            findAllLocationsForUser: findAllLocationsForUser,
            deleteLocationByIndex: deleteLocationByIndex,
            deleteUserLocationById: deleteUserLocationById,
            updateLocationById: updateLocationById,
            getAllLocations: getAllLocations,
            getLocationsByName: getLocationsByName
        };

        return api;

        // Adds property called _id with a timestamp as a unique ID
        // Adds property called userId equal to user id parameter
        // Adds new location to local array of locations
        // Calls back with new location
        function createLocationForUser(userId, location) {
            return $http.post("/api/project/location/" + userId, location);
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

        // Iterates over the array of locations and removes the location at the given index
        // Calls back with remaining array of all users
        function deleteLocationByIndex(index, callback) {
            for (var i = 0; i < locations.length; i++) {
                if (i == index) {
                    locations.splice(i, 1);
                    break;
                }
            };
            callback(locations);
        }

        // Iterates over the array of locations and removes the location with the given id
        // Calls back with remaining array of locations for the given user id
        function deleteUserLocationById(userId, locationId, callback) {
            for (var i = 0; i < locations.length; i++) {
                if (locations[i]._id == locationId) {
                    locations.splice(i, 1);
                    callback(locations[i]);
                    break;
                }
            };

            var updatedLocationList = [];
            findAllLocationsForUser(userId, function(response) {
                updatedLocationList = response;
            })
            callback(updatedLocationList);
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

        function getAllLocations() {
            return $http.get("/api/project/location");
        }

        function getLocationsByName(name, callback) {
            //TODO
            callback(locations);
        }
    }
})();