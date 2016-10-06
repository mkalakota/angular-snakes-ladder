angular.module('snakes-ladder')
    .directive('slLadder', function () {
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
            templateUrl: 'components/ladder.html',
            templateNamespace: 'svg',
            controller: 'LadderController',
            controllerAs: 'ladder'
        };
    })
    .controller('LadderController', ['$scope', 'slGetLocation', function ($scope, getLocation) {
        'use strict';
        var ladder = this;

        ladder.head = getLocation($scope.toSpace, $scope.spaces, $scope.spaceWidth, $scope.spaceHeight);
        ladder.tail = getLocation($scope.fromSpace, $scope.spaces, $scope.spaceWidth, $scope.spaceHeight);
    }]);