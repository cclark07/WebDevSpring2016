(function() {
    angular
        .module("MovieAdminApp", [])
        .controller("MovieListController", MovieListController);

    function MovieListController($scope) {
        $scope.movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 234, title: "Avatar", director: "James Cameron"},
            {id: 345, title: "Aliens", director: "James Cameron"}
        ];

        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        function addMovie(movie) {
            var newMovie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
            $scope.movies.push(newMovie);
        }

        function deleteMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        }

        function selectMovie(movie) {
            $scope.movie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
        }

        function updateMovie(movie) {
            var index = $scope.movies.indexOf(movie);

            $scope.movies[index] = {
                id: $scope.movie.id,
                title: $scope.movie.title,
                director: $scope.movie.director
            };
        }
    }
})();