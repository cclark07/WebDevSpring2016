"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var vm = this;

        // Inject update function into scope
        vm.update = update;
        vm.addEmail = addEmail;
        vm.addPhone = addPhone;

    	// Get currentUser from rootScope
    	var user = $rootScope.currentUser;

    	// Update controller variables bound to view inputs with currentUser data
        vm.username = user.username;
        vm.password = user.password;
        vm.firstName = user.firstName;
        vm.lastName = user.lastName;
        vm.emails = user.emails;
        vm.phones = user.phones;

        // Updates the current user
        function update() {
            user.username = vm.username;
            user.password = vm.password;
            user.firstName = vm.firstName;
            user.lastName = vm.lastName;
            user.emails = vm.emails;
            user.phones = vm.phones;

            var userId = user._id;

            delete user._id;

        	UserService.updateUser(userId, user)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                    vm.user = response.data;
                });
        }

        function addEmail() {
            vm.emails.push("user@host.domain");
        }

        function addPhone() {
            vm.phones.push("Phone Number");
        }
    }
})();