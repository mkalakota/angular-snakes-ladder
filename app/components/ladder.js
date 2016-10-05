angular.module('snakes-ladder')
    .directive('slLadder', function () {
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
    .controller('LadderController', ['$scope', 'slGetLocation', 'slGetSpace', function ($scope, getLocation, getSpace) {
        var ladder = this;

        ladder.head = getLocation($scope.toSpace, $scope.spaces.length, $scope.spaces[0].length, $scope.spaceWidth, $scope.spaceHeight);
        ladder.tail = getLocation($scope.fromSpace, $scope.spaces.length, $scope.spaces[0].length, $scope.spaceWidth, $scope.spaceHeight);
    }]);