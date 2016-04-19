"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("MapController", MapController);

    function MapController($location, LocationService) {
        var vm = this;

        vm.locations = [];

        vm.initMap = initMap;
        vm.getLocations = getLocations;

        function getLocations() {
            LocationService.getAllLocations()
                .then(function(response) {
                    vm.locations = response.data;
                });
        }

        function initMap() {
            var mapProp = {
                center:new google.maps.LatLng(42.508742,-71.120850),
                zoom:2,
                mapTypeId:google.maps.MapTypeId.HYBRID
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
        }
        google.maps.event.addDomListener(window, 'load', initMap);

        if ($location.url() == '/home') {
            getLocations();
            initMap();
        }
    }
})();


