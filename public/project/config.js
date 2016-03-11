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
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/locations", {
                templateUrl: "views/locations/locations.view.html",
                controller: "LocationsController"
            })
            .when("/create", {
                templateUrl: "views/users/create.view.html",
                controller: "CreateController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();