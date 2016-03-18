"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($rootScope, FieldsService) {
        function init() {
            FieldsService.init();
        }

        init();
    }
})();