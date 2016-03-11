"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        // Inject login function into scope
        $scope.login = login;

        // Controller variables bound to view inputs
        $scope.username;
        $scope.password;

        // Attempt to login with input values
        // If the user exists, it's stored in the $rootScope and user is re-routed to profile page
        function login() {
            UserService.findUserByCredentials($scope.username, $scope.password, function(response) {
                if (response) {
                    $rootScope.currentUser = response;
                    $location.path("/profile");
                }
            });
        }
    }
})();