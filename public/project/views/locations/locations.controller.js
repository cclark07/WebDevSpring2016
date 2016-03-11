"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("LocationsController", LocationsController);

    function LocationsController($scope, LocationService) {
        $scope.locations = [];

        function init() {
            LocationService.getAllLocations(function(response) {
                $scope.locations = response;
            })
        }

        init();
    }
})();