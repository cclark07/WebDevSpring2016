"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .factory("UserService", UserService);

    function UserService($http) {

		var api = {
            login: login,
            logout: logout,
			findUserByCredentials: findUserByCredentials,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUser: deleteUser,
			updateUser: updateUser,
            addFavoriteToUser: addFavoriteToUser,
            removeFavoriteFromUser: removeFavoriteFromUser
		};

		return api;

        function login(username, password) {
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login", credentials);
        }

        function logout() {
            return $http.post("/api/project/logout");
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

        function addFavoriteToUser(userId, locationId) {
            return $http.put("/api/project/user/" + userId + "/" + locationId);
        }

        function removeFavoriteFromUser(userId, locationId) {
            return $http.put("/api/project/user/" + userId + "/" + locationId + "/remove");
        }
    }
})();