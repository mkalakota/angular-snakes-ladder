angular.module('snakes-ladder', ['dndLists'])
    .controller('AppController', ['$scope', '$http', '$timeout', 'slCreateSpaces', 'slGetSpace', 'GamePlayService', function ($scope, $http, $timeout, createSpaces, getSpace, gamePlay) {
        var app = this,
            rows = 10,
            columns = 10;

        app.spaces = createSpaces(rows, columns);
        app.players = gamePlay.getPlayers();
        app.currentPlayer = gamePlay.getCurrentPlayer;
        app.isGameEnded = gamePlay.isGameEnded;

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

        $scope.$on('sl-dice-rolled', function (event, eventData) {
            var player = eventData.oldPlayer,
                nextSpace = player.spaces.at + eventData.diceRoll;

            $scope.$broadcast('sl-move-peg', {
                player: player,
                next: nextSpace > 100 ? player.spaces.at : nextSpace
            });
        });
    }]);