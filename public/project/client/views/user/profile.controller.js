"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService, LocationService) {
        var vm = this;

        var selectedLocation;

        vm.updateDetails = updateDetails;
        vm.addLocation = addLocation;
        vm.deleteLocation = deleteLocation;
        vm.selectLocation = selectLocation;
        vm.updateLocation = updateLocation;

        // Get currentUser from rootScope
        var user = $rootScope.currentUser;

        // Update controller variables bound to view inputs with currentUser data
        vm.username = user.username;
        vm.password = user.password;
        vm.firstname = user.firstName;
        vm.lastname = user.lastName;
        vm.email = user.email;

        vm.userLocations = [];

        if (user) {
            init();
        }

        // Initializes the user and user forms
        function init() {
            LocationService.findAllLocationsForUser(user._id)
                .then(function(response) {
                    vm.userLocations = response.data;
                });
        }

        // Updates the current user
        function updateDetails() {
            user.username = vm.username;
            user.password = vm.password;
            user.firstName = vm.firstname;
            user.lastName = vm.lastname;
            user.email = vm.email;
            user.locations = vm.userLocations;

            UserService.updateUser(user._id, user)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                    user = response.data;
                })
        }

        // Uses the LocationService to create a new location for the current user
        function addLocation() {
            var newLocation = {
                "name":vm.locationName,
                "userId":user._id,
                "latlon":vm.latlon,
                "webcamURL":vm.webcamURL,
                "weatherURL":vm.weatherURL,
                "status":"Open"
            };
            LocationService.createLocationForUser(user._id, newLocation)
                .then(function(response) {
                    vm.userLocations = response.data;
                })
        }

        // Uses the LocationService to delete the location at the selected index
        function deleteLocation(index) {
            var locationId = vm.userLocations[index]._id;
            LocationService.deleteLocationById(locationId)
                .then(function(response) {
                    init();
                })
        }

        // Selects the location at the given index to be edited
        function selectLocation(index) {
            selectedLocation = vm.userLocations[index];
            vm.locationName = selectedLocation.name;
            vm.latlon = selectedLocation.latlon;
            vm.webcamURL = selectedLocation.webcamURL;
            vm.weatherURL = selectedLocation.weatherURL;
        }

        //Updates selected location with updated data
        function updateLocation() {
            if (!selectedLocation) {
                return;
            }

            var newlocation = selectedLocation;
            var locationId = selectedLocation._id;
            newlocation.name = vm.locationName;
            newlocation.userId = user._id;
            newlocation.latlon = vm.latlon;
            newlocation.webcamURL = vm.webcamURL;
            newlocation.weatherURL = vm.weatherURL;
            newlocation.status = selectedLocation.status;

            LocationService.updateLocationById(locationId, newlocation)
                .then(function(response) {

                })
        }
    }
})();