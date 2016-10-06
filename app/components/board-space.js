angular.module('snakes-ladder')
    .directive('slBoardSpace', function () {
        'use strict';
        return {
            restrict: 'A',
            scope: {
                number: '=',
                locationX: '=',
                locationY: '=',
                width: '=',
                height: '='
            },
            templateUrl: 'components/board-space.html',
            templateNamespace: 'svg'
        };
    });