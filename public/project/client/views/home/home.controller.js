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
        vm.searchLocations = searchLocations;

        vm.locationName;
        vm.userId
        vm.latlon;
        vm.webcamURL;
        vm.weatherURL;
        vm.status;

        function searchLocations() {
            if (vm.searchLocation) {
                getLocationsByName();
            }
            else {
                getAllLocations();
            }
        }

        function getAllLocations() {
            LocationService.getAllLocations()
                .then(function(response) {
                    vm.locations = response.data;
                });
        }

        function getLocationsByName() {
            vm.locations = [];

            LocationService.getLocationsByName(vm.searchLocation)
                .then(function(response) {
                    vm.locations = response.data;
                });
        }
    }
})();