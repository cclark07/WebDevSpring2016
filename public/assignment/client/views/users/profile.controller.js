"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var vm = this;

        // Inject update function into scope
        vm.update = update;

    	// Get currentUser from rootScope
    	var user = $rootScope.currentUser;

    	// Update controller variables bound to view inputs with currentUser data
        vm.username = user.username;
        vm.password = user.password;
        vm.firstName = user.firstName;
        vm.lastName = user.lastName;
        vm.emails = user.emails;

        // Updates the current user
        function update() {
            user.username = vm.username;
            user.password = vm.password;
            user.firstName = vm.firstName;
            user.lastName = vm.lastName;
            user.emails = vm.emails;

        	UserService.updateUser(user._id, user)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                    vm.user = response.data;
                });
        }
    }
})();