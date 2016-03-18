"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

		var api = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById,
		};

		return api;

        // Adds property called _id with a timestamp as a unique ID
        // Adds property called userId equal to user id parameter
        // Adds new form to local array of forms
        function createFormForUser(userId, newForm) {
            return $http.post("/api/assignment/user/" + userId + "/form", newForm);
        }

        // Iterates over the array of current forms looking for forms whose user id is parameter user id
        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        // Iterates over array of forms looking for form whose id is form id parameter
        // If found, removes form from current array of forms
        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        // Iterates over array of forms looking for form whose id is form id parameter
        // If found, updates form object with new form values and calls back with update form
        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
})();