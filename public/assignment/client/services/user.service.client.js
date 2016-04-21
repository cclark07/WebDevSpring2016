"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

		var api = {
			findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser,
            login: login,
            logout: logout,
            register: register
		};

		return api;

        function login(username, password) {
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/assignment/login", credentials);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(newUser) {
            return $http.post("/api/assignment/register", newUser);
        }

        // Returns user with given credentials or null if not found
        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        // Returns user with given username or null if not found
        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        // Returns user with the given id or null if not found
        function findUserById(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }

        // Returns all users
        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

  		// Adds user to stored users
        // Returns newly created user
        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

		// Deletes user with given id if found in all users
		// Returns all users
        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

		// Updates the user with the given id with the data in the given user object
        // Returns updated user or null if not found
        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }
})();