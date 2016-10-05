angular.module('snakes-ladder')
    .factory('slCreateSpaces', function () {
        return function (rowsNumber, columnsNumber) {
            var rowIdx, columnIdx,
                row, space,
                spaces = [],
                totalSpaces = rowsNumber * columnsNumber;

            for (rowIdx = 0; rowIdx < rowsNumber; rowIdx++) {
                row = [];
                for (columnIdx = 0; columnIdx < columnsNumber; columnIdx++) {
                    space = {id: totalSpaces--, positionY: rowIdx};
                    rowIdx % 2 ? row.splice(0, 0, space) : row.push(space);
                    space.positionX = rowIdx % 2 ? columnsNumber - columnIdx - 1 : columnIdx;
                }
                spaces.push(row);
            }

            return spaces;
        };
    })
    .factory('slGetPosition', function () {
        return function (spaceNumber, rowsNumber, columnsNumber) {
            var hPosition,
                vPosition;

            vPosition = rowsNumber - Math.floor(spaceNumber / rowsNumber) - 1; // index starts from '0'
            hPosition = (spaceNumber % rowsNumber) - 1;
            if (vPosition % 2 === 0) {
                hPosition = columnsNumber - hPosition - 1; // index starts from 0
            }
            if (spaceNumber % rowsNumber === 0) {
                vPosition % 2 ? hPosition++ : hPosition--;
                vPosition++;
            }

            return {
                h: hPosition,
                v: vPosition
            };
        };
    })
    .factory('slGetLocation', ['slGetPosition', function (slGetPosition) {
        return function (spaceNumber, spaces, spaceWidth, spaceHeight) {
            var position = slGetPosition(spaceNumber, spaces.length, spaces[0].length);

            return {
                x: position.h * spaceWidth + spaceWidth / 2,
                y: position.v * spaceHeight + spaceHeight / 2
            };
        };
    }])
    .factory('slGetSpace', ['slGetPosition', function (slGetPosition) {
        return function (spaceNumber, spaces) {
            var position = slGetPosition(spaceNumber, spaces.length, spaces[0].length);

            return spaces[position.v][position.h];
        };
    }]);