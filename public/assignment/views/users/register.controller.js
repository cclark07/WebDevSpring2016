"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

    	// Inject register function into scope
    	$scope.register = register;

    	// Controller variables to be bound to view inputs
        $scope.username;
        $scope.password;
        $scope.verify;
        $scope.email;

  		// Uses the UserService to create the new user
		// Store the new user object in the $rootScope as currentUser
		// Use the $location service to navigate to the profile view
        function register() {
        	var newUser = {
        		"username":$scope.username,  "password":$scope.password,   "email":$scope.email, "roles": ["student"]
        	};
        	UserService.createUser(newUser, function(response) {
        		$rootScope.currentUser = response;
        		$location.path("#/profile");
        	})
        }
    }
})();