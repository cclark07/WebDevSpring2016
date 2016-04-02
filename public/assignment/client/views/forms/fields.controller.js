"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, $routeParams) {
        var vm = this;

        $("#sortable").sortable({ handle: '.sortHandle', axis: "y",
            stop: function(eventResponse, ui) {
                // This should update the model with the new order
                // 4+ hours of trying to figure it out but no cigar :/
                // FEEDBACK REQUEST:
                //  How can I get an array of _ids from the sortable items?
                //  The standard .toArray() returns the array of HTML id's (which are empty strings)
                //  Is there a way to get data about the entity instance being sorted?
                //  If I could get the _ids for the fields being sorted and place them in an array
                //      updating the model would be fairly trivial.
                //                      THANKS!!!!
            }
        });

        vm.fieldType = null;
        vm.optionText = "";

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
        vm.saveEdit = saveEdit;
        vm.cancelEdit = cancelEdit;

        var formId = null;

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
                            label: "New Text Field",
                            type: "TEXT",
                            placeholder: "New Field"
                        };
                        break;
                    case "TEXTAREA":
                        field = {
                            label: "New Text Field",
                            type: "TEXTAREA",
                            placeholder: "New Field"
                        };
                        break;
                    case "DATE":
                        field = {
                            label: "New Date Field",
                            type: "DATE",
                            placeholder: "New Field"
                        };
                        break;
                    case "OPTIONS":
                        field = {
                            label: "New Dropdown",
                            type: "OPTIONS",
                            placeholder: "New Field",
                            options: [
                                {label: "Option 1", value: "OPTION 1"},
                                {label: "Option 2", value: "OPTION 2"},
                                {label: "Option 3", value: "OPTION 3"}
                            ]
                        };
                        break;
                    case "CHECKBOXES":
                        field = {
                            label: "New Checkboxes",
                            type: "CHECKBOXES",
                            placeholder: "New Field",
                            options: [
                                {label: "Option A", value: "OPTION A"},
                                {label: "Option B", value: "OPTION B"},
                                {label: "Option C", value: "OPTION C"}
                            ]
                        };
                        break;
                    case "RADIOS":
                        field = {
                            label: "New Radio Buttons",
                            type: "RADIOS",
                            placeholder: "New Field",
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
                        vm.fields = response.data.fields;
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
            vm.fieldEdit = field;
            vm.optionText = "";
            if (vm.fieldEdit.options) {
                for (var i = 0; i < vm.fieldEdit.options.length; i++) {
                    var option = vm.fieldEdit.options[i];
                    vm.optionText += option.label + ":" + option.value;

                    if (i < vm.fieldEdit.options.length - 1) {
                        vm.optionText += "\n";
                    }
                }
            }
        }

        function saveEdit() {
            var lines = vm.optionText.split("\n");
            var newOptionsArray = [];
            for (var i in lines) {
                if (lines[i] != "") {
                    var lineArray = lines[i].split(":");
                    var newOption = {
                        label: lineArray[0],
                        value: lineArray[1]
                    };
                    newOptionsArray.push(newOption);
                }
            }
            vm.fieldEdit.options = newOptionsArray;

            FieldsService.updateField(formId, vm.fieldEdit._id, vm.fieldEdit)
                .then(function(response) {
                    vm.fieldEdit = response.data;
                    init();
                })
        }

        function moveField(field) {
            console.log(field);
        }

        function cancelEdit() {
            vm.fieldEdit = null;
        }
    }
})();
