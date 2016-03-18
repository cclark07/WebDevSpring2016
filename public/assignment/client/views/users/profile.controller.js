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
        vm.firstname = user.firstName;
        vm.lastname = user.lastName;
        vm.email = user.email;

        // Updates the current user
        function update() {
            user.username = vm.username;
            user.password = vm.password;
            user.firstName = vm.firstname;
            user.lastName = vm.lastname;
            user.email = vm.email;

        	UserService.updateUser(user._id, user)
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                    vm.user = response.data;
                });
        }
    }
})();