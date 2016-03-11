"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("LocationsController", LocationsController);

    function LocationsController($scope, LocationService) {
        $scope.locations = [];

        init();

        // Inject functions into scope
        $scope.addLocation = addLocation;
        //$scope.deleteUser = deleteUser;
        //$scope.selectUser = selectUser;
        //$scope.updateUser = updateUser;

        $scope.locationName;
        $scope.userId
        $scope.latlon;
        $scope.webcamURL;
        $scope.weatherURL;
        $scope.status;

        function init() {
            LocationService.getAllLocations(function(response) {
                $scope.locations = response;
            })
        }

        // Uses the LocationService to create a new location
        function addLocation() {
            var newLocation = {
                "name":$scope.locationName,
                "userId":$scope.userId,
                "latlon":$scope.latlon,
                "webcamURL":$scope.webcamURL,
                "weatherURL":$scope.weatherURL,
                "status":$scope.status
            };
            LocationService.createLocationForUser($scope.userId, newLocation, function(response) {});
        }
    }
})();