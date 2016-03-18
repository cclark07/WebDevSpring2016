"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

		var api = {
			findUserByCredentials: findUserByCredentials,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};

		return api;

        // Creates credentials object from input values and passes them to user.service.server.js
        function findUserByCredentials(username, password) {
			var credentials = {
				username: username,
				password: password
			}
            console.log(credentials.username);
			return $http.post("/api/assignment/user", credentials);
        }

        // Calls back with array of all users
        function findAllUsers(callback) {
            return users;
        }

  		// Adds property called _id with unique value (timestamp) to the user object parameter
		// Adds the new user to local array of users
		// Calls back with new user
        function createUser(user, callback) {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user);
        }

		// Iterates over the array of current users looking for the given user id
		// If found, removes user from the array of current users
		// Calls back with remaining array of all users
        function deleteUserById(userId, callback) {
            for (var i = 0; i < users.length; i++) {
            	if (users[i]._id == userId) {
            		users.splice(i, 1);
                    break;
            	}
            };
            callback(users);
        }


		// Iterates over the array of current users looking for the given user id
		// If found, updates user with new user properties and calls back with updated user
		// If not found, calls back with null
        function updateUser(userId, user, callback) {
            for (var i = 0; i < users.length; i++) {
            	if (users[i]._id == userId) {
            		users[i] = user;
            		callback(users[i]);
            		return;
            	}
            };
            callback(null);
        }
    }
})();