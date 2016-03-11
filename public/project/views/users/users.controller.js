"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("UsersController", UsersController);

    function UsersController($scope, UserService) {
        $scope.users = [];
        var selectedUser;

        init();

        // Inject functions into scope
        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

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
            UserService.createUser(newUser, function(response) {});
        }

        // Uses the UserService to delete the user at the selected index
        function deleteUser(index) {
            UserService.deleteUserByIndex(index, function(response) {
                $scope.users = response;
            })
        }

        // Selects the user at the given index to be edited
        function selectUser(index) {
            selectedUser = $scope.users[index];
            $scope.username = selectedUser.username;
            $scope.password = selectedUser.password;
            $scope.firstName = selectedUser.firstName;
            $scope.lastName = selectedUser.lastName;
            $scope.email = selectedUser.email;
            $scope.roles = selectedUser.roles;
        }

        // Updates selected user with updated data
        function updateUser() {
            if (!selectedUser) {
                return;
            }

            var newuser = selectedUser;
            var userId = selectedUser._id;
            newuser.username = $scope.username;
            newuser.password = $scope.password;
            newuser.firstName = $scope.firstName;
            newuser.lastName = $scope.lastName;
            newuser.email = $scope.email;
            newuser.roles = $scope.roles;

            UserService.updateUser(userId, newuser, function(response) {});
        }
    }
})();