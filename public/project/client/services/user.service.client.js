"use strict";
(function(){
    angular
        .module("SourceCamApp")
        .factory("UserService", UserService);

    function UserService($http) {
		//var test = $http.get("/api/project/user");
		//console.log(test);
    	var users;

    	users = [
    	{	"_id":0,
    	"firstName":"admin",
    	"lastName":"admin",
    	"username":"admin",
    	"password":"admin",
    	"roles": ["User", "Admin"],
    	},
    	{	"_id":1,
    	"firstName":"Alan",
    	"lastName":"Turing",
    	"username":"alan",
    	"password":"alan",
    	"roles": ["User"],
    	},
    	{	"_id":2,
    	"firstName":"Bob",
    	"lastName":"Dole",
    	"username":"bob",
    	"password":"bob",
    	"roles": ["User"],
    	},
    	{	"_id":3,
    	"firstName":"Bruce",
    	"lastName":"Clark",
    	"username":"bruce",
    	"password":"bruce",
    	"roles": ["User"],
    	},
    	{	"_id":4,
    	"firstName":"Chris",
    	"lastName":"Craig",
    	"username":"chris",
    	"password":"chris",
    	"roles": ["User"],
    	},
    	{	"_id":5,
    	"firstName":"Dan",
    	"lastName":"Da Man",
    	"username":"dan",
    	"password":"dan",
    	"roles": ["User"],
    	}
    	];

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
        function findUserByCredentials(username, password, callback) {
            for (var i = 0; i < users.length; i++) {
            	if (users[i].username == username && users[i].password == password) {
            		callback(users[i]);
            		return;
            	}
            };
            callback(null);
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