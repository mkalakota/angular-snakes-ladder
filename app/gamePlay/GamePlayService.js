angular.module('snakes-ladder')
    .factory('GamePlayService', function () {
        // initialization
        var players = [], diceRoll, currentPlayer;

        // single player
        function initialize() {
            players.length = 0;
            players.push(createPlayer(1));
            currentPlayer = players[0];
            diceRoll = 1;
        }

        function createPlayer(playerId) {
            return {
                id: playerId,
                stats: {
                    rolls: 0,
                    sixRolls: 0,
                    consecutiveRolls: 0,
                    ladder: 0,
                    snake: 0
                },
                spaces: {
                    at: 1
                }
            };
        }

        initialize();

        return {
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
                currentPlayer.stats.rolls++;
                if (diceRoll === 6 && currentPlayer.stats.consecutiveSixRolls < 3) {
                    currentPlayer.stats.sixRolls++;
                    currentPlayer.stats.consecutiveSixRolls++;
                } else {
                    // switch to next player and reset plays
                    currentPlayer.stats.consecutiveSixRolls = 0;
                    currentPlayer = players[currentPlayer.id % players.length];
                }
            },
            getDiceRoll: function () {
                return diceRoll;
            },
            resetGame: initialize
        };
    });