"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService, LocationService) {
        $scope.newLocation = newLocation;
        $scope.update = update;

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
        function update() {
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

        function newLocation() {
            $location.url("/create");
        }


    }
})();