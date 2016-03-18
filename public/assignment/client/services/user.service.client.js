"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

		var api = {
			findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            getUserById: getUserById,
            getAllUsers: getAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};

		return api;

        // Returns user with given credentials or null if not found
        function findUserByCredentials(username, password) {
            var test = $http.get("/api/assignment/user?username=" + username + "&password=" + password);
            return test;
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        // Returns user with the given id or null if not found
        function getUserById(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }

        // Returns all users
        function getAllUsers() {
            return $http.get("/api/assignment/user");
        }

  		// Adds user to stored users
        // Returns all users
        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

		// Deletes user with given id if found in all users
		// Returns all users
        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user" + userId);
        }

		// Updates the user with the given id with the data in the given user object
        // Returns all users
        function updateUser(userId, user) {
            return $http.put("/api/assignment/user" + userId, user);
        }
    }
})();