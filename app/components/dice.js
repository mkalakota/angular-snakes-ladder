angular.module('snakes-ladder')
    .directive('slDice', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/dice.html',
            controller: 'DiceController',
            controllerAs: 'dice'
        };
    })
    .controller('DiceController', ['$scope', '$timeout', function ($scope, $timeout) {
        var dice = this;

        dice.rolling = false;
        dice.rolled = 1;

        dice.roll = function () {
            dice.rolling = true;
            var rolled = Math.floor(Math.random() * 6) + 1; //Math.floor(Math.random() * (max - min + 1)) + min;

            $timeout(function () {
                dice.rolling = false;
                dice.rolled = rolled;
                $timeout(function () {
                    $scope.$emit('sl-dice-rolled', dice.rolled);
                }, 200);
            }, 2000)
        };
    }]);