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

		// Iterates over the array of current users looking for user object whose 
		// username and password match the parameters then calls back with user found or null otherwise
        function findUserByCredentials(username, password) {
			return $http.get("/api/project/user?username=" + username + "&password=" + password);
            //for (var i = 0; i < users.length; i++) {
            //	if (users[i].username == username && users[i].password == password) {
            //		callback(users[i]);
            //		return;
            //	}
            //};
            //callback(null);
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