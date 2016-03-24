"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location) {
        var vm = this;

        vm.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $location.path("#/home");
        }
    }
})();