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
        vm.lat;
        vm.lon;
        vm.webcamURL;
        vm.status;

        function init() {
            vm.locationName = "";
            vm.userId = "";
            vm.lat = "";
            vm.lon = "";
            vm.webcamURL = "";
            vm.status = "";
            selectedLocation = null;

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
                "lat":vm.lat,
                "lon":vm.lon,
                "webcamURL":vm.webcamURL,
                "status":vm.status,
                "comments":[]
            };

            LocationService.createLocationForUser(vm.userId, newLocation)
                .then(function(response) {
                    init();
                })
        }

        // Uses the LocationService to delete the location at the selected index
        function deleteLocation(index) {
            var locationId = vm.locations[index]._id;
            LocationService.deleteLocationById(locationId)
                .then(function(response) {
                    init();
                });
        }

        // Selects the location at the given index to be edited
        function selectLocation(index) {
            selectedLocation = vm.locations[index];
            vm.locationName = selectedLocation.name;
            vm.userId = selectedLocation.userId;
            vm.lat = selectedLocation.lat;
            vm.lon = selectedLocation.lon;
            vm.webcamURL = selectedLocation.webcamURL;
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
            newlocation.lat = vm.lat;
            newlocation.lon = vm.lon;
            newlocation.webcamURL = vm.webcamURL;
            newlocation.status = vm.status;
            newlocation.comments = selectedLocation.comments;

            delete newlocation._id;

            LocationService.updateLocationById(locationId, newlocation)
                .then(function(response) {
                    init();
                })
        }
    }
})();