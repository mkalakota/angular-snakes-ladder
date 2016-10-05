angular.module("snakes-ladder",["dndLists"]).controller("AppController",["$scope","$http","$timeout","slCreateSpaces","slGetSpace","GamePlayService",function(a,e,t,r,s,n){var l=this,c=10,d=10;l.spaces=r(c,d),l.players=n.getPlayers(),l.isGameEnded=n.isGameEnded,e.get("config/snakes.json").then(function(a){var e;for(l.snakes=a.data,e=0;e<l.snakes.length;e++)s(l.snakes[e].from,l.spaces).link=l.snakes[e].to}),e.get("config/ladders.json").then(function(a){var e;for(l.ladders=a.data,e=0;e<l.ladders.length;e++)s(l.ladders[e].from,l.spaces).link=l.ladders[e].to}),a.$on("sl-dice-rolled",function(e,t){var r=t.oldPlayer,s=r.spaces.at+t.diceRoll;a.$broadcast("sl-move-peg",{player:r,next:s>100?r.spaces.at:s})})}]),angular.module("snakes-ladder").factory("slCreateSpaces",function(){return function(a,e){var t,r,s,n,l=[],c=a*e;for(t=0;t<a;t++){for(s=[],r=0;r<e;r++)n={id:c--,positionY:t},t%2?s.splice(0,0,n):s.push(n),n.positionX=t%2?e-r-1:r;l.push(s)}return l}}).factory("slGetPosition",function(){return function(a,e,t){var r,s;return s=e-Math.floor(a/e)-1,r=a%e-1,s%2===0&&(r=t-r-1),a%e===0&&(s%2?r++:r--,s++),{h:r,v:s}}}).factory("slGetLocation",["slGetPosition",function(a){return function(e,t,r,s){var n=a(e,t.length,t[0].length);return{x:n.h*r+r/2,y:n.v*s+s/2}}}]).factory("slGetSpace",["slGetPosition",function(a){return function(e,t){var r=a(e,t.length,t[0].length);return t[r.v][r.h]}}]),angular.module("snakes-ladder").run(["$templateCache",function(a){a.put("components/board-space.html",'<rect class="sl-board-space"\r\n      data-ng-attr-x="{{locationX}}"\r\n      data-ng-attr-y="{{locationY}}"\r\n      data-ng-attr-width="{{width}}"\r\n      data-ng-attr-height="{{height}}">\r\n</rect>\r\n<text class="sl-board-space-number"\r\n      data-ng-attr-x="{{locationX + 4}}"\r\n      data-ng-attr-y="{{locationY + 16}}">\r\n    {{number}}\r\n</text>'),a.put("components/board.html",'<svg xmlns="http://www.w3.org/2000/svg"\r\n     width="100%"\r\n     height="100%">\r\n    <g class="sl-board-row"\r\n       data-ng-repeat="row in spaces"\r\n       data-ng-init="locationY = $index * spaceHeight">\r\n        <g class="sl-board-column"\r\n           data-ng-repeat="space in row track by space.id"\r\n           data-ng-class="space.id % 2 ? \'sl-board-column-odd\' : \'sl-board-column-even\'"\r\n           sl-board-space\r\n           data-number="space.id"\r\n           data-location-x="$index * spaceWidth"\r\n           data-location-y="locationY"\r\n           data-width="spaceWidth"\r\n           data-height="spaceHeight">\r\n        </g>\r\n    </g>\r\n    <g class="sl-snake"\r\n       data-ng-repeat="snake in snakes"\r\n       sl-snake\r\n       data-space-width="spaceWidth"\r\n       data-space-height="spaceHeight"\r\n       data-from-space="snake.from"\r\n       data-to-space="snake.to"\r\n       data-spaces="spaces">\r\n    </g>\r\n    <g class="sl-ladder"\r\n       data-ng-repeat="ladder in ladders"\r\n       sl-ladder\r\n       data-space-width="spaceWidth"\r\n       data-space-height="spaceHeight"\r\n       data-from-space="ladder.from"\r\n       data-to-space="ladder.to"\r\n       data-spaces="spaces">\r\n    </g>\r\n    <g class="sl-peg"\r\n       data-ng-repeat="player in players"\r\n       sl-peg\r\n       data-player="player"\r\n       data-spaces="spaces"\r\n       data-space-width="spaceWidth"\r\n       data-space-height="spaceHeight">\r\n    </g>\r\n</svg>'),a.put("components/ladder.html","<!-- variable 'ladder' is LadderController -->\r\n<path class=\"sl-ladder sl-ladder-left\"\r\n      data-ng-attr-d=\"{{'M'+(ladder.head.x-5)+' '+(ladder.head.y)+' L '+(ladder.tail.x-5)+' '+(ladder.tail.y)}}\">\r\n</path>\r\n<path class=\"sl-ladder sl-ladder-right\"\r\n      data-ng-attr-d=\"{{'M'+(ladder.head.x+5)+' '+(ladder.head.y)+' L '+(ladder.tail.x+5)+' '+(ladder.tail.y)}}\">\r\n</path>"),a.put("components/peg.html",'<!-- variable \'peg\' is PegController -->\r\n<circle class="sl-peg"\r\n        data-ng-attr-r="{{peg.radius}}"\r\n        data-ng-attr-cx="{{peg.location.x}}"\r\n        data-ng-attr-cy="{{peg.location.y}}">\r\n</circle>'),a.put("components/snake.html",'<!-- variable \'snake\' is SnakeController -->\r\n<circle class="sl-snake-head"\r\n        r="5"\r\n        data-ng-attr-cx="{{snake.head.x}}"\r\n        data-ng-attr-cy="{{snake.head.y}}">\r\n</circle>\r\n<path class="sl-snake-body"\r\n      data-ng-attr-d="{{snake.attributes}}">\r\n</path>'),a.put("results/results.html",'<div class="sl-game-results"\r\n     data-ng-controller="ResultsController as results">\r\n    <header class="sl-game-play-header">\r\n        <h3 class="sl-game-play-title">Results\r\n            <button class="btn btn-default"\r\n                    data-ng-click="results.newGame()">\r\n                New Game\r\n            </button>\r\n        </h3>\r\n    </header>\r\n    <div class="sl-game-play-body">\r\n        <ul class="sl-players-result"\r\n            data-dnd-list="results.players">\r\n            <li class="sl-player-result"\r\n                data-ng-repeat="player in results.players"\r\n                data-dnd-draggable="player"\r\n                data-dnd-moved="results.players.splice($index,1)"\r\n                data-dnd-effect-allowed="move">\r\n                <label>Player {{player.id}}</label>\r\n                <div>\r\n                    <span>{{player.stats.rolls}} Dice rolled,&nbsp;</span>\r\n                    <span>{{player.stats.sixRolls}} Six(s) rolled,&nbsp;</span>\r\n                    <span>{{player.stats.snake}} Snake bite(s),&nbsp;</span>\r\n                    <span>{{player.stats.ladder}} Ladder climb(s)</span>\r\n                </div>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>'),a.put("gamePlay/game-play.html",'<div class="sl-game-play"\r\n     data-ng-controller="GamePlayController as gamePlay">\r\n    <header class="sl-game-play-header">\r\n        <h3 class="sl-game-play-title">Game Play</h3>\r\n        <div class="sl-game-play-actions pull-right">\r\n            <button class="btn"\r\n                    title="Add Player"\r\n                    data-ng-click="gamePlay.service.addPlayer()"\r\n                    data-ng-disabled="gamePlay.service.getPlayers().length === 4">\r\n                <i class="fa fa-plus fa-lg"></i>\r\n            </button>\r\n            <button class="btn"\r\n                    title="End Game"\r\n                    data-ng-click="gamePlay.service.endGame()">\r\n                <i class="fa fa-times fa-lg"></i>\r\n            </button>\r\n            <button class="btn"\r\n                    title="Reset Game"\r\n                    data-ng-click="gamePlay.service.resetGame()">\r\n                <i class="fa fa-refresh fa-lg"></i>\r\n            </button>\r\n        </div>\r\n        <div class="clearfix"></div>\r\n    </header>\r\n    <div class="sl-game-play-body">\r\n        <section class="sl-players">\r\n            <h4>Players</h4>\r\n            <div class="sl-player"\r\n                 data-ng-repeat="player in gamePlay.service.getPlayers()"\r\n                 data-ng-class="player.id === gamePlay.service.getCurrentPlayer().id ? \'sl-player-playing\' : \'\'">\r\n                <span class="sl-player-name">{{player.id}}</span>\r\n            </div>\r\n            <div class="sl-players-note">*maximum 4 players at a time</div>\r\n        </section>\r\n        <section class="sl-dice-section">\r\n            <h4>Roll Dice</h4>\r\n            <div class="sl-dice-container">\r\n                <span class="sl-dice"\r\n                      data-ng-click="gamePlay.rollDice()">{{gamePlay.service.getDiceRoll()}}</span>\r\n            </div>\r\n        </section>\r\n        <section class="sl-action-log">\r\n            <p></p>\r\n        </section>\r\n    </div>\r\n</div>')}]),angular.module("snakes-ladder").directive("slBoard",function(){"use strict";return{restrict:"E",scope:{spaces:"=",snakes:"=",ladders:"=",players:"="},templateUrl:"components/board.html",templateNamespace:"svg",link:function(a,e,t){var r=e.find("svg"),s=r.width(),n=r.height();a.spaceWidth=s/a.spaces[0].length,a.spaceHeight=n/a.spaces.length}}}),angular.module("snakes-ladder").directive("slBoardSpace",["$templateCache",function(a){return{restrict:"A",scope:{number:"=",locationX:"=",locationY:"=",width:"=",height:"="},templateUrl:"components/board-space.html",templateNamespace:"svg"}}]),angular.module("snakes-ladder").directive("slSnake",function(){return{restrict:"A",scope:{fromSpace:"=",toSpace:"=",spaceWidth:"=",spaceHeight:"=",spaces:"="},templateUrl:"components/snake.html",templateNamespace:"svg",controller:"SnakeController",controllerAs:"snake"}}).controller("SnakeController",["$scope","slGetLocation",function(a,e){function t(a,e){var t="M"+a.x+" "+a.y;return t+=" Q "+e.x+" "+a.y,t+=" "+(a.x+e.x)/2+" "+(a.y+e.y)/2,t+=" T "+e.x+" "+e.y}var r=this;r.head=e(a.fromSpace,a.spaces,a.spaceWidth,a.spaceHeight),r.tail=e(a.toSpace,a.spaces,a.spaceWidth,a.spaceHeight),r.attributes=t(r.head,r.tail)}]),angular.module("snakes-ladder").directive("slLadder",function(){return{restrict:"A",scope:{fromSpace:"=",toSpace:"=",spaceWidth:"=",spaceHeight:"=",spaces:"="},templateUrl:"components/ladder.html",templateNamespace:"svg",controller:"LadderController",controllerAs:"ladder"}}).controller("LadderController",["$scope","slGetLocation",function(a,e){var t=this;t.head=e(a.toSpace,a.spaces,a.spaceWidth,a.spaceHeight),t.tail=e(a.fromSpace,a.spaces,a.spaceWidth,a.spaceHeight)}]),angular.module("snakes-ladder").directive("slPeg",function(){return{restrict:"A",scope:{player:"=",spaces:"=",spaceWidth:"=",spaceHeight:"="},templateUrl:"components/peg.html",templateNamespace:"svg",controller:"PegController",controllerAs:"peg"}}).controller("PegController",["$scope","$timeout","slGetLocation","slGetSpace",function(a,e,t,r){var s=this;s.location=t(a.player.spaces.at,a.spaces,a.spaceWidth,a.spaceHeight),s.radius=Math.min(a.spaceWidth,a.spaceHeight)/4-2,a.$on("sl-move-peg",function(n,l){var c;l.player.id===a.player.id&&a.player.spaces.at!==l.next&&(s.location=t(l.next,a.spaces,a.spaceWidth,a.spaceHeight),a.player.spaces.last=a.player.spaces.at,a.player.spaces.at=l.next,c=r(l.next,a.spaces),c.link&&e(function(){c.link<l.next?a.player.stats.snake++:a.player.stats.ladder++,a.$broadcast("sl-move-peg",{player:a.player,next:c.link})},1e3))})}]),angular.module("snakes-ladder").factory("GamePlayService",function(){function a(){n.length=0,n.push(e(1)),r=n[0],t=1,s=!1}function e(a){return{id:a,stats:{rolls:0,sixRolls:0,consecutiveSixRolls:0,ladder:0,snake:0},spaces:{at:1}}}var t,r,s,n=[];return a(),{addPlayer:function(){n.length<4&&n.push(e(n.length+1))},getPlayers:function(){return n},getCurrentPlayer:function(){return r},rollDice:function(){t=Math.floor(6*Math.random())+1,r.stats.rolls++,6===t&&r.stats.consecutiveSixRolls<3?(r.stats.sixRolls++,r.stats.consecutiveSixRolls++):(r.stats.consecutiveSixRolls=0,r=n[r.id%n.length])},getDiceRoll:function(){return t},resetGame:a,endGame:function(){s=!0},isGameEnded:function(){return s}}}),angular.module("snakes-ladder").controller("GamePlayController",["$scope","GamePlayService",function(a,e){var t=this;t.service=e,t.rollDice=function(){var t,r=e.getCurrentPlayer();e.rollDice(),t=e.getCurrentPlayer(),a.$emit("sl-dice-rolled",{oldPlayer:r,newPlayer:t,diceRoll:e.getDiceRoll()})}}]),angular.module("snakes-ladder").controller("ResultsController",["$scope","GamePlayService",function(a,e){var t=this;t.players=angular.copy(e.getPlayers()),t.newGame=e.resetGame}]);