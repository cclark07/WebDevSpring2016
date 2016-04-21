"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;
        // Inject register function into scope
        vm.register = register;

        // Controller variables to be bound to view inputs
        vm.username;
        vm.password;
        vm.verify;
        vm.firstname;
        vm.lastname;
        vm.email;

        // Uses the UserService to create the new user
        // Store the new user object in the $rootScope as currentUser
        // Use the $location service to navigate to the profile view
        function register() {
            var newUser = {
                "username":vm.username,
                "password":vm.password,
                "firstName":vm.firstname,
                "lastName":vm.lastname,
                "email":vm.email,
                "roles": ["User"]
            };

            UserService.register(newUser)
                .then(function(response) {
                    if (response.data) {
                        $rootScope.currentUser = response.data;
                        $location.path("/profile");
                    }
                })
        }
    }
})();