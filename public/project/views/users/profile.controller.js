"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService, LocationService) {
        var selectedLocation;

        $scope.updateDetails = updateDetails;
        $scope.addLocation = addLocation;
        $scope.deleteLocation = deleteLocation;
        $scope.selectLocation = selectLocation;
        $scope.updateLocation = updateLocation;

        // Get currentUser from rootScope
        var user = $rootScope.currentUser;

        // Update controller variables bound to view inputs with currentUser data
        $scope.username = user.username;
        $scope.password = user.password;
        $scope.firstname = user.firstName;
        $scope.lastname = user.lastName;
        $scope.email = user.email;

        $scope.userLocations = [];

        if (user) {
            init();
        }

        // Initializes the user and user forms
        function init() {
            LocationService.findAllLocationsForUser(user._id, function(response) {
                $scope.userLocations = response;
            });
        }

        // Updates the current user
        function updateDetails() {
            user.username = $scope.username;
            user.password = $scope.password;
            user.firstName = $scope.firstname;
            user.lastName = $scope.lastname;
            user.email = $scope.email;
            user.locations = $scope.userLocations;

            UserService.updateUser(user._id, user, function(response) {
                $rootScope.currentUser = response;
                user = response;
            });
        }

        // Uses the LocationService to create a new location for the current user
        function addLocation() {
            var newLocation = {
                "name":$scope.locationName,
                "userId":user._id,
                "latlon":$scope.latlon,
                "webcamURL":$scope.webcamURL,
                "weatherURL":$scope.weatherURL,
                "status":"Open"
            };
            LocationService.createLocationForUser(user._id, newLocation, function(response) {
                $scope.userLocations.push(response);
            });
        }

        // Uses the LocationService to delete the location at the selected index
        function deleteLocation(index) {
            var locationId = $scope.userLocations[index]._id;
            var userId = user._id;
            console.log($scope.userLocations.length);
            LocationService.deleteUserLocationById(userId, locationId, function(response) {
                $scope.userLocations = response;
            })
            console.log($scope.userLocations.length);
        }

        // Selects the location at the given index to be edited
        function selectLocation(index) {
            selectedLocation = $scope.userLocations[index];
            $scope.locationName = selectedLocation.name;
            $scope.latlon = selectedLocation.latlon;
            $scope.webcamURL = selectedLocation.webcamURL;
            $scope.weatherURL = selectedLocation.weatherURL;
        }

        //Updates selected location with updated data
        function updateLocation() {
            if (!selectedLocation) {
                return;
            }

            var newlocation = selectedLocation;
            var locationId = selectedLocation._id;
            newlocation.name = $scope.locationName;
            newlocation.userId = user._id;
            newlocation.latlon = $scope.latlon;
            newlocation.webcamURL = $scope.webcamURL;
            newlocation.weatherURL = $scope.weatherURL;
            newlocation.status = selectedLocation.status;

            LocationService.updateLocationById(locationId, newlocation, function(response) {});
        }
    }
})();