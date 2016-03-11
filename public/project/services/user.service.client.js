"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .factory("UserService", UserService);

    function UserService() {
    	var users;

    	users = [
		  {	"_id":1,
			  "firstName":"Alice",
			  "lastName":"Wonderland",
			  "username":"alice",
			  "password":"alice",
			  "roles": ["User"],
			  "locations":[]		},
		  {	"_id":2,
			  "firstName":"Bob",
			  "lastName":"Hope",
			  "username":"bob",
			  "password":"bob",
			  "roles": ["Admin"],
			  "locations":[]		},
		  {	"_id":3,
			  "firstName":"Bruce",
			  "lastName":"Clark",
			  "username":"bruce",
			  "password":"bruce",
			  "roles": ["User"],
			  "locations":[]		},
		  {	"_id":4,
			  "firstName":"Dan",
			  "lastName":"Craig",
			  "username":"dan",
			  "password":"dan",
			  "roles": ["User", "Admin"],
			  "locations":[]		},
		  {	"_id":5,
			  "firstName":"Edward",
			  "lastName":"Norton",
			  "username":"ed",
			  "password":"ed",
			  "roles": ["User"],
			  "locations":[]		}
		];

		var api = {
			findUserByCredentials: findUserByCredentials,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserByIndex: deleteUserByIndex,
			updateUser: updateUser
		};

		return api;

		// Iterates over the array of current users looking for user object whose 
		// username and password match the parameters then calls back with user found or null otherwise
        function findUserByCredentials(username, password, callback) {
            for (var i = 0; i < users.length; i++) {
            	if (users[i].username == username && users[i].password == password) {
            		callback(users[i]);
            		return;
            	}
            };
            callback(null);
        }

        // Calls back with array of all users
        function findAllUsers(callback) {
            callback(users);
        }

  		// Adds property called _id with unique value (timestamp) to the user object parameter
		// Adds the new user to local array of users
		// Calls back with new user
        function createUser(user, callback) {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user);
        }

		// Iterates over the array of current users and removes the user at the given index
		// Calls back with remaining array of all users
        function deleteUserByIndex(index, callback) {
            for (var i = 0; i < users.length; i++) {
            	if (i == index) {
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