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
        $scope.addLocation = addLocation;
        $scope.updateLocation = updateLocation;
        $scope.deleteLocation = deleteLocation;
        $scope.selectLocation = selectLocation;

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
        function addLocation() {
            var newform = {"title":$scope.formname};
        	FormService.createFormForUser(user._id, newform, function(response) {
                $scope.userforms.push(response);
            });
        }

        // Update currently selected form
        function updateLocation() {
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
        function deleteLocation(index) {
        	var test = $scope.userforms[index];
            FormService.deleteFormById(test._id, function(response) {
                init()
            });
        }

        // Selects the form at the given index to be edited
        function selectLocation(index) {
        	selectedForm = $scope.userforms[index];
            $scope.formname = selectedForm.title;
        }
    }
})();