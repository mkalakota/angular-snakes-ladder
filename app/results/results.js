angular.module('snakes-ladder')
    .controller('ResultsController', ['$scope', 'GamePlayService', function ($scope, gamePlayService) {
        'use strict';
        var results = this;

        results.players = angular.copy(gamePlayService.getPlayers());

        results.newGame = gamePlayService.resetGame;
    }]);