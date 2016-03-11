(function(){
    angular
        .module("SourceCamApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.html",
                controller: "ProfileController"
            })
            .when("/users", {
                templateUrl: "views/users/users.view.html",
                controller: "UsersController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/location", {
                templateUrl: "views/location/location.view.html",
                controller: "LocationController"
            })
            .when("/locations", {
                templateUrl: "views/locations/locations.view.html",
                controller: "LocationsController"
            })
            .when("/create", {
                templateUrl: "views/user/create.view.html",
                controller: "CreateController"
            })
            .when("/map", {
                templateUrl: "views/worldmap/worldmap.view.html",
                controller: "MapController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();