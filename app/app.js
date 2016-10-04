angular.module('snakes-ladder', [])
    .controller('AppController', ['$http', function ($http) {
        var app = this;

        app.options = {
            rows: 10,
            columns: 10
        };

        // load snakes
        $http.get('config/snakes.json').then(function (response) {
            app.options.snakes = response.data;
        });
        // load ladders
        $http.get('config/ladders.json').then(function (response) {
            app.options.ladders = response.data;
        });
    }]);