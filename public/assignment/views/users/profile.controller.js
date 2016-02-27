(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService) {
    	// Get currentUser from rootScope
    	var user = $rootScope.currentUser;

       // Inject update function into scope
    	$scope.update = update;

    	// Controller variables to be bound to view inputs
        $scope.username;
        $scope.password;
        $scope.firstname;
        $scope.lastname;
        $scope.email;

        function update() {
        	
        }
    }
})();