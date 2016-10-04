angular.module('snakes-ladder')
    .directive('slBoard', function () {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/board.html',
            templateNamespace: 'svg',
            controller: 'BoardController',
            controllerAs: 'board',
            link: function (scope, element, attrs) {
                var svgElement = element.find("svg"),
                    width = svgElement.width(),
                    height = svgElement.height();

                scope.spaceWidth = width / scope.options.columns;
                scope.spaceHeight = height / scope.options.rows;
            }
        };
    })
    .controller('BoardController', ['$scope', function ($scope) {
        'use strict';
        var board = this,
            options = $scope.options;

        function createSpaces(rowsNumber, columnsNumber) {
            var rowIdx, columnIdx,
                row, column,
                spaces = [],
                totalSpaces = rowsNumber * columnsNumber;

            for (rowIdx = 0; rowIdx < rowsNumber; rowIdx++) {
                row = [];
                for (columnIdx = 0; columnIdx < columnsNumber; columnIdx++) {
                    column = totalSpaces--;
                    rowIdx % 2 ? row.splice(0, 0, column) : row.push(column);
                }
                spaces.push(row);
            }

            return spaces;
        }

        board.spaces = createSpaces(options.rows, options.columns);
    }]);