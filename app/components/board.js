angular.module('snakes-ladder')
    .directive('slBoard', function () {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                spaces: '=',
                snakes: '=',
                ladders: '=',
                players: '=',
                currentPlayer: '='
            },
            templateUrl: 'components/board.html',
            templateNamespace: 'svg',
            link: function (scope, element, attrs) {
                var svgElement = element.find("svg"),
                    width = svgElement.width(),
                    height = svgElement.height();

                scope.spaceWidth = width / scope.spaces[0].length;
                scope.spaceHeight = height / scope.spaces.length;
            }
        };
    });