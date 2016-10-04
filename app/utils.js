angular.module('snakes-ladder')
    .factory('slGetLocation', function () {
        return function (spaceNumber, rowsNumber, columnsNumber, spaceWidth, spaceHeight) {
            var hLocation,
                vLocation;

            vLocation = rowsNumber - Math.floor(spaceNumber / rowsNumber);
            hLocation = vLocation % 2 ? columnsNumber + 1 - (spaceNumber % rowsNumber) : (spaceNumber % rowsNumber);
            if (spaceNumber % rowsNumber === 0) {
                vLocation++;
                hLocation++
            }

            return {
                x: hLocation * spaceWidth - spaceWidth / 2,
                y: vLocation * spaceHeight - spaceHeight / 2
            };
        };
    });