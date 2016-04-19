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

        vm.addComment = addComment;
        vm.favoriteLocation = favoriteLocation;

        function init() {
            LocationService.getLocationById(locationId)
                .then(function(response) {
                    vm.location = response.data;
                })
        }

        init();

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

            UserService.addFavoriteToUser(userId, locationId)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                })
        }
    }
})();