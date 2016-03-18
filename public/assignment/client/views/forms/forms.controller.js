"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, FormService) {
        var vm = this;

        var user;
        var selectedForm;
        vm.userforms = [];

    	// If the current user exists, get its forms
    	if ($rootScope.currentUser) {
    		init();
    	}

    	// Inject functions into scope
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

    	// Bind controller variables to view inputs
        vm.formname;

        // Initializes the user and user forms
        function init() {
            FormService.findAllFormsForUser($rootScope.currentUser._id)
                .then(function(response) {
                    vm.userforms = response.data;
                    user = $rootScope.currentUser;
            });
        }

        // Uses form model and FormService to create a new form
        // Adds the new form to the array of userforms
        function addForm() {
            var newform = {"title":vm.formname};
        	FormService.createFormForUser(user._id, newform)
                .then(function(response) {
                    vm.userforms.push(response.data);
                    init();
                });
        }

        // Update currently selected form
        function updateForm() {
            if (!selectedForm) {
                return;
            }

            var newform = selectedForm;
            newform.title = vm.formname;
            if (selectedForm) {
                FormService.updateFormById(selectedForm._id, newform)
                    .then(function(response) {
                        init();
                    })
            }
        }

        // Delete the form at the given index
        function deleteForm(index) {
        	var form = vm.userforms[index];
            FormService.deleteFormById(form._id)
                .then(function(response) {
                    init();
                });
        }

        // Selects the form at the given index to be edited
        function selectForm(index) {
        	selectedForm = vm.userforms[index];
            vm.formname = selectedForm.title;
        }
    }
})();