"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .controller("MainController", MainController);

    function MainController($location) {
    	var vm = this;

        vm.$location = $location;
    }
})();