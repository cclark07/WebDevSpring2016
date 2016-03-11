"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();