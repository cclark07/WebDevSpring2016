"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("LocationsController", LocationsController);

    function LocationsController($scope, LocationService) {
        $scope.locations = [];
        var selectedLocation;

        init();

        // Inject functions into scope
        $scope.addLocation = addLocation;
        $scope.deleteLocation = deleteLocation;
        $scope.selectLocation = selectLocation;
        $scope.updateLocation = updateLocation;

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

        // Uses the LocationService to delete the location at the selected index
        function deleteLocation(index) {
            LocationService.deleteLocationByIndex(index, function(response) {
                $scope.locations = response;
            })
        }

        // Selects the location at the given index to be edited
        function selectLocation(index) {
            selectedLocation = $scope.locations[index];
            $scope.locationName = selectedLocation.name;
            $scope.userId = selectedLocation.userId;
            $scope.latlon = selectedLocation.latlon;
            $scope.webcamURL = selectedLocation.webcamURL;
            $scope.weatherURL = selectedLocation.weatherURL;
            $scope.status = selectedLocation.status;
        }

        //Updates selected location with updated data
        function updateLocation() {
            if (!selectedLocation) {
                return;
            }

            var newlocation = selectedLocation;
            var locationId = selectedLocation._id;
            newlocation.name = $scope.locationName;
            newlocation.userId = $scope.userId;
            newlocation.latlon = $scope.latlon;
            newlocation.webcamURL = $scope.webcamURL;
            newlocation.weatherURL = $scope.weatherURL;
            newlocation.status = $scope.status;

            LocationService.updateLocationById(locationId, newlocation, function(response) {});
        }
    }
})();