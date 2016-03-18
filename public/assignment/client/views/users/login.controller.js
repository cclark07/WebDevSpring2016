"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        var vm = this;

        // Inject login function into view model
        vm.login = login;

  		// Attempt to login with input values
		// If the user exists, it's stored in the $rootScope and user is re-routed to profile page
        function login() {
        	UserService.findUserByCredentials(vm.user.username, vm.user.password)
                .then(function(response){
                    if(response.data) {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                });
        }
    }
}());