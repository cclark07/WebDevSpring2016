"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .factory("UserService", UserService);

    function UserService($http) {

		var api = {
            login: login,
			findUserByCredentials: findUserByCredentials,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUser: deleteUser,
			updateUser: updateUser
		};

		return api;

        function login(username, password) {
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login", credentials);
        }

        function findUserByCredentials(username, password) {
			return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
			return $http.get("/api/project/user");
        }

        function createUser(user) {
			return $http.post("/api/project/user", user);
        }

        function deleteUser(userId) {
			return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
			return $http.put("/api/project/user/" + userId, user);
        }
    }
})();