angular.module('snakes-ladder')
    .factory('GamePlayService', function () {
        // initialization

        // single player
        var players = [], diceRoll, currentPlayer;

        function initialize() {
            players.length = 0;
            players.push(createPlayer(1))
            currentPlayer = players[0];
            diceRoll = 1;
        }

        function createPlayer(playerId) {
            return {
                id: playerId,
                rolls: 0,
                sixRolls: 0,
                consecutiveRolls: 0,
                ladder: 0,
                snake: 0
            };
        }

        initialize();

        return {
            players: players,
            addPlayer: function () {
                players.length < 4 && players.push(createPlayer(players.length + 1));
            },
            getPlayers: function () {
                return players;
            },
            getCurrentPlayer: function () {
                return currentPlayer;
            },
            rollDice: function () {
                diceRoll = Math.floor(Math.random() * 6) + 1; //Math.floor(Math.random() * (max - min + 1)) + min;
                currentPlayer.rolls++;
                if (diceRoll === 6 || currentPlayer.consecutiveRolls < 3) {
                    currentPlayer.sixRolls++;
                    currentPlayer.consecutiveRolls++;
                } else {
                    // switch to next player and reset plays
                    currentPlayer.consecutiveRolls = 0;
                    currentPlayer = (currentPlayer % players.length) + 1;
                }
            },
            getDiceRoll: function () {
                return diceRoll;
            },
            resetGame: initialize
        };
    });