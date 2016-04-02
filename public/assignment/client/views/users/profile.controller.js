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

        vm.emailCounter = 0;
        vm.phoneCounter = 0;

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

        	UserService.updateUser(user._id, user)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                    vm.user = response.data;
                });
        }

        function addEmail() {
            vm.emailCounter += 1;
            vm.emails.push("user@host.domain" + vm.emailCounter);
        }

        function addPhone() {
            vm.phoneCounter += 1;
            vm.phones.push("Phone Number " + vm.phoneCounter);
        }
    }
})();