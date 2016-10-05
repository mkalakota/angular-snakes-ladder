angular.module('snakes-ladder')
    .controller('GamePlayController', ['$scope', 'GamePlayService', function ($scope, gamePlayService) {
        var gamePlay = this;

        gamePlay.service = gamePlayService;

        gamePlay.endGame = function () {
        };

    }]);