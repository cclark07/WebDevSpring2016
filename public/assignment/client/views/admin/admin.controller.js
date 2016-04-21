"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $rootScope) {
        var vm = this;

        vm.users = [];
        var selectedUser;

        // Inject functions into scope
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        vm.username;
        vm.password;
        vm.firstName;
        vm.lastName;
        vm.roles;

        function init() {
            vm.username = "";
            vm.password = "";
            vm.firstName = "";
            vm.lastName = "";
            vm.roles = [];
            selectedUser = null;

            UserService.findAllUsers()
                .then(function(response) {
                    vm.users = response.data;
                });
        }

        init();

        // Uses the UserService to create the new user
        function addUser() {
            var roles = vm.roles.replace(/\s+/g, '').split(',');

            var newUser = {
                "username":vm.username,
                "password":vm.password,
                "firstName":vm.firstName,
                "lastName":vm.lastName,
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
            UserService.deleteUserById(userId)
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
            vm.roles = selectedUser.roles;
        }

        // Updates selected user with updated data
        function updateUser() {
            if (!selectedUser) {
                return;
            }

            var newuser = selectedUser;
            var userId = selectedUser._id;

            delete newuser._id;

            newuser.username = vm.username;
            newuser.password = vm.password;
            newuser.firstName = vm.firstName;
            newuser.lastName = vm.lastName;
            newuser.roles = vm.roles;

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