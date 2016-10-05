angular.module('snakes-ladder')
    .controller('GamePlayController', ['$scope', 'GamePlayService', function ($scope, gamePlayService) {
        var gamePlay = this;

        gamePlay.service = gamePlayService;

        gamePlay.rollDice = function () {
            var oldPlayer = gamePlayService.getCurrentPlayer(),
                newPlayer;

            gamePlayService.rollDice();
            newPlayer = gamePlayService.getCurrentPlayer();

            $scope.$emit('sl-dice-rolled', {
                oldPlayer: oldPlayer,
                newPlayer: newPlayer,
                diceRoll: gamePlayService.getDiceRoll()
            });
        };

    }]);