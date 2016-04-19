"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("MapController", MapController);

    function MapController($location, LocationService) {
        var vm = this;
        var markerLinks = [];

        vm.locations = [];

        vm.initMap = initMap;
        vm.getLocations = getLocations;

        function getLocations() {
            LocationService.getAllLocations()
                .then(function(response) {
                    vm.locations = response.data;
                    initMap();
                });
        }

        function initMap() {
            markerLinks = [];

            var mapProp = {
                center:new google.maps.LatLng(42.508742,-71.120850),
                zoom:2,
                mapTypeId:google.maps.MapTypeId.HYBRID
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

            for (var i = 0; i < vm.locations.length; i++) {
                var marker = new google.maps.Marker({
                    position: {lat: vm.locations[i].lat, lng: vm.locations[i].lon},
                    map: map,
                    title: vm.locations[i].name
                });

                markerLinks[i] = {marker: marker, url: vm.locations[i].webcamURL};
                addListener(i);
            }
        }
        google.maps.event.addDomListener(window, 'load', initMap);

        if ($location.url() == '/home') {
            getLocations();
        }

        function addListener(index) {
            markerLinks[index].marker.addListener('click', function() {
                window.open(markerLinks[index].url);
            });
        }
    }
})();


