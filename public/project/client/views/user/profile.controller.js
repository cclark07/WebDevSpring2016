"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, UserService, LocationService) {
        var vm = this;

        var selectedLocation;

        vm.updateDetails = updateDetails;
        vm.addLocation = addLocation;
        vm.deleteLocation = deleteLocation;
        vm.selectLocation = selectLocation;
        vm.updateLocation = updateLocation;

        // Get currentUser from rootScope
        var user = $rootScope.currentUser;

        if (!user) {
            $location.path("/home");
        }

        // Update controller variables bound to view inputs with currentUser data
        vm.username = user.username;
        vm.password = user.password;
        vm.firstname = user.firstName;
        vm.lastname = user.lastName;
        vm.email = user.email;

        vm.userLocations = [];

        var userFavoriteIds = user.favorites;
        vm.userFavorites = [];

        // Initializes the user and user forms
        function init() {
            LocationService.findAllLocationsForUser(user._id)
                .then(function(response) {
                    vm.userLocations = response.data;
                });

            for (var id in userFavoriteIds) {
                LocationService.getLocationById(userFavoriteIds[id])
                    .then(function(response) {
                        vm.userFavorites.push(response.data);
                    })
            }
        }

        init();

        // Updates the current user
        function updateDetails() {
            user.username = vm.username;
            user.password = vm.password;
            user.firstName = vm.firstname;
            user.lastName = vm.lastname;
            user.email = vm.email;
            user.locations = vm.userLocations;

            var userId = user._id;

            delete user._id;

            UserService.updateUser(userId, user)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                    user = response.data;
                });
        }

        // Uses the LocationService to create a new location for the current user
        function addLocation() {
            var newLocation = {
                "name":vm.locationName,
                "userId":user._id,
                "lat":vm.lat,
                "lon":vm.lon,
                "webcamURL":vm.webcamURL,
                "status":"Open",
                "comments":[]
            };

            delete newLocation._id;
            LocationService.createLocationForUser(user._id, newLocation)
                .then(function(response) {
                    init();
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
            vm.lat = selectedLocation.lat;
            vm.lon = selectedLocation.lon;
            vm.webcamURL = selectedLocation.webcamURL;
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
            newlocation.lat = vm.lat;
            newlocation.lon = vm.lon;
            newlocation.webcamURL = vm.webcamURL;
            newlocation.status = selectedLocation.status;
            newLocation.comments = selectedLocation.comments;

            LocationService.updateLocationById(locationId, newlocation)
                .then(function(response) {

                })
        }
    }
})();