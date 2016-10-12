angular.module('snakes-ladder')
    .directive('slBoard', function () {
        'use strict';
        return {
            restrict: 'A',
            scope: {
                spaces: '=',
                snakes: '=',
                ladders: '=',
                players: '=',
                currentPlayer: '='
            },
            templateUrl: 'components/board.html',
            templateNamespace: 'svg',
            link: function (scope, element) {
                var svgElement = element.find('svg'),
                    width = element.width(),
                    height = element.height();

                scope.spaceWidth = width / scope.spaces[0].length;
                scope.spaceHeight = height / scope.spaces.length;

                svgElement.css({
                    width: width,
                    height: height
                });
            }
        };
    });