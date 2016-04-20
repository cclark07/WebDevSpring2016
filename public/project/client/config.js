(function(){
    angular
        .module("SourceCamApp")
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
                templateUrl: "views/user/register.view.html",
                controller: "RegisterController",
                resolve: {
                    loggedIn: checkForUser
                }
            })
            .when("/login", {
                templateUrl: "views/user/login.view.html",
                controller: "LoginController",
                resolve: {
                    loggedIn: checkForUser
                }
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedIn: checkLoggedin
                }
            })
            .when("/users", {
                templateUrl: "views/users/users.view.html",
                controller: "UsersController",
                resolve: {
                    loggedIn: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                resolve: {
                    loggedIn: checkAdmin
                }
            })
            .when("/location/:locationId", {
                templateUrl: "views/location/location.view.html",
                controller: "LocationController",
                resolve: {
                    loggedIn: checkLoggedin
                }
            })
            .when("/locations", {
                templateUrl: "views/locations/locations.view.html",
                controller: "LocationsController",
                resolve: {
                    loggedIn: checkLoggedin
                }
            })
            .when("/create", {
                templateUrl: "views/user/create.view.html",
                controller: "CreateController",
                resolve: {
                    loggedIn: checkLoggedin
                }
            })
            .when("/map", {
                templateUrl: "views/worldmap/worldmap.view.html",
                controller: "MapController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
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

        $http.get('/api/project/loggedin').success(function(user)
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

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
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