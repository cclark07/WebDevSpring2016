"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("LocationsController", LocationsController);

    function LocationsController(LocationService) {
        var vm = this;

        vm.locations = [];
        var selectedLocation;

        init();

        // Inject functions into scope
        vm.addLocation = addLocation;
        vm.deleteLocation = deleteLocation;
        vm.selectLocation = selectLocation;
        vm.updateLocation = updateLocation;

        vm.locationName;
        vm.userId;
        vm.latlon;
        vm.webcamURL;
        vm.weatherURL;
        vm.status;

        function init() {
            LocationService.getAllLocations()
                .then(function(response) {
                    vm.locations = response.data;
                });
        }

        // Uses the LocationService to create a new location
        function addLocation() {
            var newLocation = {
                "name":vm.locationName,
                "userId":vm.userId,
                "latlon":vm.latlon,
                "webcamURL":vm.webcamURL,
                "weatherURL":vm.weatherURL,
                "status":vm.status
            };

            LocationService.createLocationForUser(vm.userId, newLocation)
                .then(function(response) {
                    vm.locations = response.data;
                })
        }

        // Uses the LocationService to delete the location at the selected index
        function deleteLocation(index) {
            var locationId = vm.locations[index]._id;
            LocationService.deleteLocationById(locationId)
                .then(function(response) {
                    vm.locations = response.data;
                });
        }

        // Selects the location at the given index to be edited
        function selectLocation(index) {
            selectedLocation = vm.locations[index];
            vm.locationName = selectedLocation.name;
            vm.userId = selectedLocation.userId;
            vm.latlon = selectedLocation.latlon;
            vm.webcamURL = selectedLocation.webcamURL;
            vm.weatherURL = selectedLocation.weatherURL;
            vm.status = selectedLocation.status;
        }

        //Updates selected location with updated data
        function updateLocation() {
            if (!selectedLocation) {
                return;
            }

            var newlocation = selectedLocation;
            var locationId = selectedLocation._id;
            newlocation.name = vm.locationName;
            newlocation.userId = vm.userId;
            newlocation.latlon = vm.latlon;
            newlocation.webcamURL = vm.webcamURL;
            newlocation.weatherURL = vm.weatherURL;
            newlocation.status = vm.status;

            LocationService.updateLocationById(locationId, newlocation)
                .then(function(response) {

                })
        }
    }
})();