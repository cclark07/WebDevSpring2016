"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, $routeParams) {
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
                switch(fieldTypeValue) {
                    case "TEXT":
                        field = {
                            _id: null,
                            formId: formId,
                            label: "New Text Field",
                            type: "TEXT",
                            placeholder: "New Field"
                        };
                        break;
                    case "TEXTAREA":
                        field = {
                            _id: null,
                            formId: formId,
                            label: "New Text Field",
                            type: "TEXTAREA",
                            placeholder: "New Field"
                        };
                        break;
                    case "DATE":
                        field = {
                            _id: null,
                            formId: formId,
                            label: "New Date Field",
                            type: "DATE",
                        };
                        break;
                    case "OPTIONS":
                        field = {
                            _id: null,
                            formId: formId,
                            label: "New Dropdown",
                            type: "OPTIONS",
                            options: [
                                {label: "Option 1", value: "OPTION 1"},
                                {label: "Option 2", value: "OPTION 2"},
                                {label: "Option 3", value: "OPTION 3"}
                            ]
                        };
                        break;
                    case "CHECKBOXES":
                        field = {
                            _id: null,
                            formId: formId,
                            label: "New Checkboxes",
                            type: "CHECKBOXES",
                            options: [
                                {label: "Option A", value: "OPTION A"},
                                {label: "Option B", value: "OPTION B"},
                                {label: "Option C", value: "OPTION C"}
                            ]
                        };
                        break;
                    case "RADIOS":
                        field = {
                            _id: null,
                            formId: formId,
                            label: "New Radio Buttons",
                            type: "RADIOS",
                            options: [
                                {label: "Option X", value: "OPTION X"},
                                {label: "Option Y", value: "OPTION Y"},
                                {label: "Option Z", value: "OPTION Z"}
                            ]
                        };
                        break;
                }
                FieldsService.createFieldForForm(formId, field)
                    .then(function(response) {
                        init();
                    });
            }
        }

        function removeField(field) {
            FieldsService.deleteFieldFromForm(formId, field._id)
                .then(function(response) {
                    vm.fields = response;
                    init();
                });
        }

        function editField(field) {
            console.log(field);
        }

        function moveField(field) {
            console.log(field);
        }
    }
})();
