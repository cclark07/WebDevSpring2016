"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, FormService, $routeParams) {
        var vm = this;

        vm.fieldType = null;
        vm.fieldOptions =
            [
                'Single Line Text Field',
                'Multi Line Text Field',
                'Date Field',
                'Dropdown Field',
                'Checkboxes Field',
                'Radio Buttons Field'
            ];

        var fieldOptionMap = [
            {key: "Single Line Text Field", value: "TEXT"},
            {key: "Multi Line Text Field", value: "TEXTAREA"},
            {key: "Date Field", value: "DATE"},
            {key: "Dropdown Field", value: "OPTIONS"},
            {key: "Checkboxes Field", value: "CHECKBOXES"},
            {key: "Radio Buttons Field", value: "RADIOS"}
        ]

        vm.addField = addField;
        vm.removeField = removeField;
        vm.editField = editField;
        vm.moveField = moveField;

        var formId = null;
        vm.form = null;

        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }

        function init() {
            FieldsService.getFieldsForForm(formId)
                .then(function(response) {
                    vm.fields = response.data;
                });
        }
        init();

        function addField(fieldType) {
            var fieldTypeValue = null;
            for (var i in fieldOptionMap) {
                if (fieldOptionMap[i].key == fieldType) {
                    fieldTypeValue = fieldOptionMap[i].value;
                }
            }

            var field = null;
            if (fieldTypeValue) {
                field = {
                    label: "",
                    type: fieldTypeValue,
                    placeholder: "",
                    options: null
                };
                FieldsService.createFieldForForm(formId, field)
                    .then(function(response) {
                        init();
                    })
            }
        }

        function removeField(field) {
            console.log(field);
        }

        function editField(field) {
            console.log(field);
        }

        function moveField(field) {
            console.log(field);
        }
    }
})();
