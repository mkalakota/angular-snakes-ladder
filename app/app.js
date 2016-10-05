angular.module('snakes-ladder', [])
    .controller('AppController', ['$http', 'slCreateSpaces', 'slGetSpace', function ($http, createSpaces, getSpace) {
        var app = this,
            rows = 10,
            columns = 10;

        app.spaces = createSpaces(rows, columns);

        // load snakes
        $http.get('config/snakes.json').then(function (response) {
            var i;
            app.snakes = response.data;
            for (i = 0; i < app.snakes.length; i++) {
                getSpace(app.snakes[i].from, app.spaces).link.to = app.snakes[i].to;
            }
        });
        // load ladders
        $http.get('config/ladders.json').then(function (response) {
            var i;
            app.ladders = response.data;
            for (i = 0; i < app.ladders.length; i++) {
                getSpace(app.ladders[i].from, app.spaces).link.to = app.ladders[i].to;
            }
        });
    }]);