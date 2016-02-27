"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService) {

        // Inject update function into scope
        $scope.update = update;

    	// Get currentUser from rootScope
    	var user = $rootScope.currentUser;

    	// Update controller variables bound to view inputs with currentUser data
        $scope.username = user.username;
        $scope.password = user.password;
        $scope.firstname = user.firstname;
        $scope.lastname = user.lastname;
        $scope.email = user.email;

        // Updates the current user
        function update() {
            user.username = $scope.username;
            user.password = $scope.password;
            user.firstname = $scope.firstname;
            user.lastname = $scope.lastname;
            user.email = $scope.email;

        	UserService.updateUser(user._id, user, function(x) {console.log(x)});
        }
    }
})();