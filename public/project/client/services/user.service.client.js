"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .factory("UserService", UserService);

    function UserService($http) {

		var api = {
			findUserByCredentials: findUserByCredentials,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUser: deleteUser,
			updateUser: updateUser
		};

		return api;

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