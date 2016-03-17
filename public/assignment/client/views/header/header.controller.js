"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location) {
    	$scope.logout = logout;

        function logout() {
        	$rootScope.currentUser = null;
        	$location.path("#/home");
        }
    }
})();