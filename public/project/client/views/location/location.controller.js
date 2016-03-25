"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("LocationController", LocationController);

    function LocationController($routeParams, LocationService) {
    	var vm = this;

        var locationId = $routeParams.locationId;

        vm.location;

        function init() {
            LocationService.getLocationById(locationId)
                .then(function(response) {
                    vm.location = response.data;
                })
        }

        init();
    }
})();