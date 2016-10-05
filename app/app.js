angular.module('snakes-ladder', [])
    .controller('AppController', ['$scope', '$http', '$timeout', 'slCreateSpaces', 'slGetSpace', 'GamePlayService', function ($scope, $http, $timeout, createSpaces, getSpace, gamePlay) {
        var app = this,
            rows = 10,
            columns = 10;

        app.spaces = createSpaces(rows, columns);
        app.players = gamePlay.getPlayers();

        // load snakes
        $http.get('config/snakes.json').then(function (response) {
            var i;
            app.snakes = response.data;
            for (i = 0; i < app.snakes.length; i++) {
                getSpace(app.snakes[i].from, app.spaces).link = app.snakes[i].to;
            }
        });
        // load ladders
        $http.get('config/ladders.json').then(function (response) {
            var i;
            app.ladders = response.data;
            for (i = 0; i < app.ladders.length; i++) {
                getSpace(app.ladders[i].from, app.spaces).link = app.ladders[i].to;
            }
        });

        $scope.$watch(function () {
            return gamePlay.getCurrentPlayer().stats.rolls;
        }, function (newVal, oldVal) {
            if (newVal > oldVal) {
                var currentPlayer = gamePlay.getCurrentPlayer();
                var nextSpace = currentPlayer.spaces.at + gamePlay.getDiceRoll();
                $scope.$broadcast('sl-move-peg', {
                    player: currentPlayer,
                    next: nextSpace > 100 ? currentPlayer.spaces.at : nextSpace
                });
            }
        });
    }]);