"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        // Inject login function into scope
        vm.login = login;

        // Controller variables bound to view inputs
        vm.username;
        vm.password;

        // Attempt to login with input values
        // If the user exists, it's stored in the $rootScope and user is re-routed to profile page
        function login() {
            UserService.findUserByCredentials(vm.username, vm.password, function(response) {
                if (response) {
                    $rootScope.currentUser = response;
                    $location.path("/profile");
                }
            });
        }
    }
})();