angular.module('snakes-ladder', ['dndLists'])
    .controller('AppController', ['$scope', '$http', '$timeout', 'slCreateSpaces', 'slGetSpace', 'GamePlayService', function ($scope, $http, $timeout, createSpaces, getSpace, gamePlay) {
        'use strict';
        var app = this,
            rows = 10,
            columns = 10;

        app.spaces = createSpaces(rows, columns);
        app.players = gamePlay.getPlayers();
        app.currentPlayer = gamePlay.getCurrentPlayer;
        app.isGameEnded = gamePlay.isGameEnded;
        app.showBoard = true;

        // load snakes
        $http.get('config/snakes.json').then(function (response) {
            var i;
            app.snakes = response.data;
            for (i = 0; i < app.snakes.length; i++) {
                getSpace(app.snakes[i].from, app.spaces).link = app.snakes[i].to;
            }
        });
        // load ladders
        $http.get('config/ladders.json').then(function (response) {
            var i;
            app.ladders = response.data;
            for (i = 0; i < app.ladders.length; i++) {
                getSpace(app.ladders[i].from, app.spaces).link = app.ladders[i].to;
            }
        });

        $scope.$on('sl-dice-rolled', function (event, eventData) {
            var player = eventData.oldPlayer,
                nextSpace = player.spaces.at + eventData.diceRoll;

            $scope.$broadcast('sl-move-peg', {
                player: player,
                next: nextSpace > 100 ? player.spaces.at : nextSpace
            });
        });

        var boardTimeout;
        $scope.$on('sl-window-resize', function () {
            var $section = angular.element('main.container>section');
            app.showBoard = false;
            $scope.$digest();
            if (angular.element('html').width() < 992) {
                $section.css('height', $section.width() + 'px');
            } else {
                $section.css('height', '100%');
            }
            if (!boardTimeout) {
                boardTimeout = $timeout(function () {
                    boardTimeout = null;
                    app.showBoard = true;
                    $scope.$digest();
                }, 10);
            }
        });
    }])
    .run(['$rootScope', function ($rootScope) {
        'use strict';

        //refer https://developer.mozilla.org/en-US/docs/Web/Events/resize
        var resizeTimeout;

        function resizeThrottler() {
            // ignore resize events as long as an actualResizeHandler execution is in the queue
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(function () {
                    resizeTimeout = null;
                    // handle the resize event
                    $rootScope.$broadcast('sl-window-resize');

                    // The actualResizeHandler will execute at a rate of 15fps
                }, 66);
            }
        }

        window.addEventListener("resize", resizeThrottler, false);
    }]);