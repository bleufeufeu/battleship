const gameBoard = require('./gameboard.js');

class Player {
    constructor() {
        this.isCPU = false;
        this.gameboard = new gameBoard();
    }
}

module.exports = Player;