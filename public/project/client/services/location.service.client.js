"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .factory("LocationService", LocationService);

    function LocationService($http) {

        var api = {
            createLocationForUser: createLocationForUser,
            findAllLocationsForUser: findAllLocationsForUser,
            deleteLocationById: deleteLocationById,
            updateLocationById: updateLocationById,
            getAllLocations: getAllLocations,
            getLocationsByName: getLocationsByName
        };

        return api;

        function createLocationForUser(userId, location) {
            return $http.post("/api/project/location/" + userId, location);
        }

        function findAllLocationsForUser(userId) {
            return $http.get("/api/project/location/" + userId);
        }

        function deleteLocationById(locationId) {
            return $http.delete("/api/project/location/" + locationId);
        }

        function updateLocationById(locationId, newLocation) {
            return $http.put("/api/project/location/" + locationId, newLocation);

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