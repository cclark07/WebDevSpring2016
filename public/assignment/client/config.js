(function(){
    angular
        .module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedIn: checkForUser
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                resolve: {
                    loggedIn: checkForUser
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                resolve: {
                    loggedIn: checkForUser
                }
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedIn: isLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                resolve: {
                    loggedIn: isAdmin
                }
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormsController",
                resolve: {
                    loggedIn: isLoggedin
                }
            })
            .when("/forms/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                resolve: {
                    loggedIn: isLoggedin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var isLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };

    var checkForUser = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var isAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                if (user.roles.indexOf("Admin") >= 0) {
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                    $location.url('/');
                }
            }
            // User is Not Authenticated
            else
            {
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };
})();