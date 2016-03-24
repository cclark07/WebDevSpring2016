"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("HomeController", HomeController);

    function HomeController(LocationService) {
        var vm = this;

        vm.locations = [];

        // Inject functions into scope
        vm.searchLocations = searchLocations;

        vm.locationName;
        vm.userId
        vm.latlon;
        vm.webcamURL;
        vm.weatherURL;
        vm.status;

        function searchLocations() {
            LocationService.getAllLocations(function(response) {
                vm.locations = response;
            })
        }
    }
})();