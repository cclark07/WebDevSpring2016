"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("UsersController", UsersController);

    function UsersController($scope, UserService) {
        $scope.users = [];

        function init() {
            UserService.findAllUsers(function(response) {
                $scope.users = response;
            })
        }

        init();
    }
})();