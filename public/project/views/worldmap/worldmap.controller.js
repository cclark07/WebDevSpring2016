"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("MapController", MapController);

    function MapController() {
        function initMap() {
            var mapProp = {
                center:new google.maps.LatLng(42.508742,-71.120850),
                zoom:2,
                mapTypeId:google.maps.MapTypeId.TERRAIN
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
        }
        google.maps.event.addDomListener(window, 'load', initMap);
    }
})();


