"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location) {
        //TODO
        $scope.newLocation = newLocation;

        function newLocation() {
            $location.url("/create");
        }
    }
})();