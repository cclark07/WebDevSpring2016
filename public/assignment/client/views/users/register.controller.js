"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;

    	// Inject register function into scope
    	vm.register = register;

    	// Controller variables to be bound to view inputs
        vm.username;
        vm.password;
        vm.verify;
        vm.email;

  		// Uses the UserService to create the new user
		// Store the new user object in the $rootScope as currentUser
		// Use the $location service to navigate to the profile view
        function register() {
        	var newUser = {
        		"username":vm.username,  "password":vm.password,   "email":vm.email, "roles": ["student"]
        	};
        	UserService.createUser(newUser, function(response) {
        		$rootScope.currentUser = response;
        		$location.path("#/profile");
        	})
        }
    }
})();