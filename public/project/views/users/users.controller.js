"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("UsersController", UsersController);

    function UsersController($scope, UserService) {
        $scope.users = [];

        init();

        // Inject functions into scope
        $scope.addUser = addUser;

        $scope.username;
        $scope.password;
        $scope.firstName;
        $scope.lastName;
        $scope.email;
        $scope.roles;

        function init() {
            UserService.findAllUsers(function(response) {
                $scope.users = response;
            })
        }

        // Uses the UserService to create the new user
        function addUser() {
            var newUser = {
                "username":$scope.username,
                "password":$scope.password,
                "firstName":$scope.firstName,
                "lastName":$scope.lastName,
                "email":$scope.email,
                "roles":$scope.roles
            };
            UserService.createUser(newUser, function(response) {

            })
        }
    }
})();