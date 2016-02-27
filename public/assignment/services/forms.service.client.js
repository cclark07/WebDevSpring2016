(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
    	var forms;

    	forms = [
          {"_id": "000", "title": "Contacts", "userId": 123},
          {"_id": "010", "title": "ToDo",     "userId": 123},
          {"_id": "020", "title": "CDs",      "userId": 234},
        ];

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
        // Calls back with new form
        function createFormForUser(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        // Iterates over the array of current forms looking for forms whose user id is parameter user id
        // Calls back with found forms for user id parameter, empty array otherwise
        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userId == userId) {
                    userForms.push(forms[i]);
                }
            };
            callback(userForms);
        }

        // Iterates over array of forms looking for form whose id is form id parameter
        // If found, removes form from current array of forms
        // Calls back with remaining array of forms
        function deleteFormById(formId, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);
                    break;
                }
            };
            callback(forms);
        }

        // Iterates over array of forms looking for form whose id is form id parameter
        // If found, updates form object with new form values and calls back with update form
        // If not found, calls back with null
        function updateFormById(formId, newForm, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms[i] = form;
                    callback(forms[i]);
                    return;
                }
            };
            callback(null);
        }
    }
})();