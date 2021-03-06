"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("LocationController", LocationController);

    function LocationController($routeParams, $rootScope, LocationService, UserService) {
    	var vm = this;

        var locationId = $routeParams.locationId;

        vm.location;
        vm.commentString;
        vm.isFavorite;

        vm.addComment = addComment;
        vm.favoriteLocation = favoriteLocation;
        vm.initMap = initMap;

        function init() {
            LocationService.getLocationById(locationId)
                .then(function(response) {
                    vm.location = response.data;
                    initMap();
                    if ($rootScope.currentUser) {
                        for (var i = 0; i < $rootScope.currentUser.favorites.length; i++) {
                            if ($rootScope.currentUser.favorites[i] == vm.location._id) {
                                vm.isFavorite = true;
                                break;
                            }
                        }
                    }
                })
        }

        init();

        function initMap() {

            var mapProp = {
                center:new google.maps.LatLng(vm.location.lat,vm.location.lon),
                zoom:5,
                mapTypeId:google.maps.MapTypeId.HYBRID
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

            var marker = new google.maps.Marker({
                position: {lat: vm.location.lat, lng: vm.location.lon},
                map: map,
                title: vm.location.name
            });

            marker.addListener('click', function() {
                window.open(vm.location.webcamURL);
            });
        }
        google.maps.event.addDomListener(window, 'page:load', initMap);

        function addComment() {
            if (!$rootScope.currentUser) {
                return;
            }

            var comment = {
                user: $rootScope.currentUser.username,
                comment: vm.commentString
            };

            LocationService.addCommentToLocation(locationId, comment)
                .then(function(response) {
                    vm.location = response.data;
                })
        }

        function favoriteLocation() {
            if (!$rootScope.currentUser) {
                return;
            }

            var userId = $rootScope.currentUser._id;

            if (vm.isFavorite) {
                UserService.removeFavoriteFromUser(userId, locationId)
                    .then(function(response) {
                        vm.isFavorite = false;
                        $rootScope.currentUser = response.data;
                    })
            }
            else {
                UserService.addFavoriteToUser(userId, locationId)
                    .then(function (response) {
                        vm.isFavorite = true;
                        $rootScope.currentUser = response.data;
                    })
            }
        }
    }
})();