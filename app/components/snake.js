angular.module('snakes-ladder')
    .directive('slSnake', function () {
        'use strict';
        return {
            restrict: 'A',
            scope: {
                fromSpace: '=',
                toSpace: '=',
                spaceWidth: '=',
                spaceHeight: '=',
                spaces: '='
            },
            templateUrl: 'components/snake.html',
            templateNamespace: 'svg',
            controller: 'SnakeController',
            controllerAs: 'snake'
        };
    })
    .controller('SnakeController', ['$scope', 'slGetLocation', function ($scope, getLocation) {
        'use strict';
        var snake = this;

        function computeAttributes(fromLocation, toLocation) {
            var attributes = "M" + fromLocation.x + " " + fromLocation.y; // go to from location
            // add quadratic curve point
            attributes += " Q " + toLocation.x + " " + fromLocation.y;
            // add mid point
            attributes += " " + (fromLocation.x + toLocation.x) / 2 + " " + (fromLocation.y + toLocation.y) / 2;
            // end at to location
            attributes += " T " + toLocation.x + " " + toLocation.y;

            return attributes;
        }

        snake.head = getLocation($scope.fromSpace, $scope.spaces, $scope.spaceWidth, $scope.spaceHeight);
        snake.tail = getLocation($scope.toSpace, $scope.spaces, $scope.spaceWidth, $scope.spaceHeight);
        snake.attributes = computeAttributes(snake.head, snake.tail);
    }]);