angular.module('snakes-ladder')
    .directive('slPeg', function () {
        return {
            restrict: 'A',
            scope: {
                player: '=',
                spaces: '=',
                spaceWidth: '=',
                spaceHeight: '='
            },
            templateUrl: 'components/peg.html',
            templateNamespace: 'svg',
            controller: 'PegController',
            controllerAs: 'peg'
        };
    })
    .controller('PegController', ['$scope', '$timeout', 'slGetLocation', 'slGetSpace', function ($scope, $timeout, getLocation, getSpace) {
        var peg = this;

        peg.location = getLocation($scope.player.spaces.at, $scope.spaces, $scope.spaceWidth, $scope.spaceHeight);
        peg.radius = Math.min($scope.spaceWidth, $scope.spaceHeight) / 4 - 2;

        $scope.$on('sl-move-peg', function (event, eventData) {
            var space;
            if (eventData.player.id === $scope.player.id && $scope.player.spaces.at !== eventData.next) {
                peg.location = getLocation(eventData.next, $scope.spaces, $scope.spaceWidth, $scope.spaceHeight);
                $scope.player.spaces.last = $scope.player.spaces.at;
                $scope.player.spaces.at = eventData.next;

                space = getSpace(eventData.next, $scope.spaces);
                if (space.link) {
                    $timeout(function () { // delay for ladder climb / snake bite
                        space.link < eventData.next ? $scope.player.stats.snake++ : $scope.player.stats.ladder++;
                        $scope.$broadcast('sl-move-peg', {player: $scope.player, next: space.link})
                    }, 1000);
                }
            }
        });
    }]);