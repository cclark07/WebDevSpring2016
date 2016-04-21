"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        var vm = this;

    	vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err) {

                    }
                );
        }
    }
})();