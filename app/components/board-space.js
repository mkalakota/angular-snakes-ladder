angular.module('snakes-ladder')
    .directive('slBoardSpace', ['$templateCache', function ($templateCache) {
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
        }
    }]);