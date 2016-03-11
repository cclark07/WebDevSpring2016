"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, LocationService) {
        $scope.locations = [];

        // Inject functions into scope
        $scope.searchLocations = searchLocations;

        $scope.locationName;
        $scope.userId
        $scope.latlon;
        $scope.webcamURL;
        $scope.weatherURL;
        $scope.status;

        function searchLocations() {
            LocationService.getAllLocations(function(response) {
                $scope.locations = response;
            })
        }
    }
})();