"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        // Inject register function into scope
        $scope.register = register;

        // Controller variables to be bound to view inputs
        $scope.username;
        $scope.password;
        $scope.verify;
        $scope.firstname;
        $scope.lastname;
        $scope.email;

        // Uses the UserService to create the new user
        // Store the new user object in the $rootScope as currentUser
        // Use the $location service to navigate to the profile view
        function register() {
            var newUser = {
                "username":$scope.username,
                "password":$scope.password,
                "firstName":$scope.firstname,
                "lastName":$scope.lastname,
                "email":$scope.email,
                "roles": ["User"]
            };
            UserService.createUser(newUser, function(response) {
                $rootScope.currentUser = response;
                $location.path("/profile");
            })
        }
    }
})();