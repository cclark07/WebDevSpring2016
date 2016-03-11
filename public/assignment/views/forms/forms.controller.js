"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, $scope, FormService) {
        var user;
        var selectedForm;
        $scope.userforms = [];

    	// If the current user exists, get its forms
    	if ($rootScope.currentUser) {
    		init();
    	}

    	// Inject functions into scope
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

    	// Bind controller variables to view inputs
        $scope.formname;

        // Initializes the user and user forms
        function init() {
            FormService.findAllFormsForUser($rootScope.currentUser._id, function(response) {
                $scope.userforms = response;
                user = $scope.currentUser;
            });
        }

        // Uses form model and FormService to create a new form
        // Adds the new form to the array of userforms
        function addForm() {
            var newform = {"title":$scope.formname};
        	FormService.createFormForUser(user._id, newform, function(response) {
                $scope.userforms.push(response);
            });
        }

        // Update currently selected form
        function updateForm() {
            if (!selectedForm) {
                return;
            }

            var newform = selectedForm;
            newform.title = $scope.formname;
            if (selectedForm) {
                FormService.updateFormById(selectedForm._id, newform, function(response) {
                    init();
                })
            }
        }

        // Delete the form at the given index
        function deleteForm(index) {
        	var test = $scope.userforms[index];
            FormService.deleteFormById(test._id, function(response) {
                init()
            });
        }

        // Selects the form at the given index to be edited
        function selectForm(index) {
        	selectedForm = $scope.userforms[index];
            $scope.formname = selectedForm.title;
        }
    }
})();