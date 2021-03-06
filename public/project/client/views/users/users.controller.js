"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("UsersController", UsersController);

    function UsersController($rootScope, UserService) {
        var vm = this;

        vm.users = [];
        var selectedUser;

        init();

        // Inject functions into scope
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        vm.username;
        vm.password;
        vm.firstName;
        vm.lastName;
        vm.email;
        vm.roles;

        function init() {
            vm.username = "";
            vm.password = "";
            vm.firstName = "";
            vm.lastName = "";
            vm.email = "";
            vm.roles = [];
            selectedUser = null;

            UserService.findAllUsers()
                .then(function(response) {
                    vm.users = response.data;
                });
        }

        // Uses the UserService to create the new user
        function addUser() {
            var roles = vm.roles.replace(/\s+/g, '').split(',');

            var newUser = {
                "username":vm.username,
                "password":vm.password,
                "firstName":vm.firstName,
                "lastName":vm.lastName,
                "email":vm.email,
                "roles":roles
            };
            UserService.createUser(newUser)
                .then(function(response) {
                    init();
                });
        }

        // Uses the UserService to delete the user at the selected index
        function deleteUser(index) {
            var userId = vm.users[index]._id;
            UserService.deleteUser(userId)
                .then(function() {
                    init();
                })
        }

        // Selects the user at the given index to be edited
        function selectUser(index) {
            selectedUser = vm.users[index];
            vm.username = selectedUser.username;
            vm.password = selectedUser.password;
            vm.firstName = selectedUser.firstName;
            vm.lastName = selectedUser.lastName;
            vm.email = selectedUser.email;
            vm.roles = selectedUser.roles;
        }

        // Updates selected user with updated data
        function updateUser() {
            if (!selectedUser) {
                return;
            }

            var roles = vm.roles.replace(/\s+/g, '').split(',');

            var newuser = selectedUser;
            var userId = selectedUser._id;

            delete newuser._id;

            newuser.username = vm.username;
            newuser.password = vm.password;
            newuser.firstName = vm.firstName;
            newuser.lastName = vm.lastName;
            newuser.email = vm.email;
            newuser.roles = roles;

            UserService.updateUser(userId, newuser)
                .then(function(response) {
                    if ($rootScope.currentUser) {
                        if ($rootScope.currentUser._id == response.data._id) {
                            $rootScope.currentUser = response.data;
                        }
                    }
                    init();
                })
        }
    }
})();