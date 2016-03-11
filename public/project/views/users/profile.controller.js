"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope) {

        // Inject update function into scope
        $scope.update = update;

    	// Get currentUser from rootScope
    	//var user = $rootScope.currentUser;

    	// Update controller variables bound to view inputs with currentUser data
        //$scope.username = user.username;
        //$scope.password = user.password;
        //$scope.firstname = user.firstName;
        //$scope.lastname = user.lastName;
        //$scope.email = user.email;

        // Updates the current user
        function update() {
            //user.username = $scope.username;
            //user.password = $scope.password;
            //user.firstName = $scope.firstname;
            //user.lastName = $scope.lastname;
            //user.email = $scope.email;
            //
            //UserService.updateUser(user._id, user, function(response) {
            //    console.log(response);
            //    $rootScope.currentUser = response;
            //    user = response;
            //});
        }
    }
})();