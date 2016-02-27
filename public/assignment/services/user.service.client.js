(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
    	var users;

    	users = [
		  {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
			"username":"alice",  "password":"alice",   "roles": ["student"]		},
		  {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
			"username":"bob",    "password":"bob",     "roles": ["admin"]		},
		  {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
			"username":"charlie","password":"charlie", "roles": ["faculty"]		},
		  {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
			"username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
		  {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
			"username":"ed",     "password":"ed",      "roles": ["student"]		}
		];

		var api = {
			findUserByCredentials: findUserByCredentials,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
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