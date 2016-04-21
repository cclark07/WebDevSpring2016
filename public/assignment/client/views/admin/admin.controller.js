"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $rootScope) {
        var vm = this;

        vm.users = [];
        var selectedUser;

        vm.sortAscending = null;

        vm.usernameSort = false;
        vm.firstNameSort = false;
        vm.lastNameSort = false;

        // Inject functions into scope
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.sortColumn = sortColumn;
        vm.usernameComp = usernameComp;
        vm.firstNameComp = firstNameComp;
        vm.lastNameComp = lastNameComp;

        vm.username;
        vm.password;
        vm.firstName;
        vm.lastName;
        vm.roles;

        function init() {
            vm.sortAscending = null;

            vm.usernameSort = false;
            vm.firstNameSort = false;
            vm.lastNameSort = false;

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

            var roles = vm.roles.replace(/\s+/g, '').split(',');

            var newuser = selectedUser;
            var userId = selectedUser._id;

            delete newuser._id;

            newuser.username = vm.username;
            newuser.password = vm.password;
            newuser.firstName = vm.firstName;
            newuser.lastName = vm.lastName;
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

        function sortColumn(sortFunction) {
            vm.sortAscending = !vm.sortAscending;
            vm.users.sort(sortFunction);
        }

        function usernameComp(a, b) {
            var result = a.username.toLowerCase().localeCompare((b.username.toLowerCase()));

            if(vm.sortAscending) {
                result *= -1;
            }

            vm.usernameSort = true;
            vm.firstNameSort = false;
            vm.lastNameSort = false;
            return result;
        }

        function firstNameComp(a, b) {
            var result = a.firstName.toLowerCase().localeCompare((b.firstName.toLowerCase()));

            if(vm.sortAscending) {
                result *= -1;
            }

            vm.usernameSort = false;
            vm.firstNameSort = true;
            vm.lastNameSort = false;
            return result;
        }

        function lastNameComp(a, b) {
            var result = a.lastName.toLowerCase().localeCompare((b.lastName.toLowerCase()));

            if(vm.sortAscending) {
                result *= -1;
            }

            vm.usernameSort = false;
            vm.firstNameSort = false;
            vm.lastNameSort = true;
            return result;
        }
    }
})();