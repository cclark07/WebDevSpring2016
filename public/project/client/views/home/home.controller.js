"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("HomeController", HomeController);

    function HomeController(LocationService) {
        var vm = this;

        vm.locations = [];

        vm.searchLocation;

        // Inject functions into scope
        vm.getAllLocations = getAllLocations;
        vm.getLocationsByName = getLocationsByName;

        vm.locationName;
        vm.userId
        vm.latlon;
        vm.webcamURL;
        vm.weatherURL;
        vm.status;

        function getAllLocations() {
            LocationService.getAllLocations(function(response) {
                vm.locations = response;
            })
        }

        function getLocationsByName() {
            vm.locations = [];

            LocationService.getLocationsByName(vm.searchLocation, function(response) {
                vm.locations = response;
            })
        }
    }
})();