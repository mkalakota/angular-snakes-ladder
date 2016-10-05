angular.module('snakes-ladder')
    .controller('ResultsController', ['$scope', 'GamePlayService', function ($scope, gamePlayService) {
        var results = this;

        results.players = angular.copy(gamePlayService.getPlayers());

        results.newGame = gamePlayService.resetGame;
    }]);