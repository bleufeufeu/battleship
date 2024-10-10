const Ship = require('./ship.js');

class Square {
    constructor() {
        this.ship = null;
        this.hasShip = false;
        this.misfired = false;
        this.beenHit = false;
    }
}

class gameBoard {
    constructor() {
        this.board = this.createBoard(10);
        this.shipCount = 0;
    }

    createBoard(num) {
        let finalBoard = [];
        for (let i = 0; i < num; i++) {
            finalBoard[i] = [];
            for (let j = 0; j < num; j++) {
                finalBoard[i][j] = new Square;
            }
        }
        return finalBoard;
    }

    getSquare(x, y, arr) {
        if (x >= this.size || y >= this.size || x < 0 || y < 0) {
            return null;
        }
        return arr[x][y];
    }

    placeShip(x, y, length) {
        const ship = new Ship(length);
        let square = this.getSquare(x, y, this.board);
        
        square.ship = ship;
        square.hasShip = true;
        this.shipCount++;
    }

    receiveAttack(x, y) {
        let attacked = this.getSquare(x, y, this.board);
        if (attacked.beenHit) return;

        attacked.beenHit = true;

        if (attacked.hasShip) {
            attacked.ship.hit();
            if (attacked.ship.isSunk()) this.shipCount--;
        }
        else if (!attacked.hasShip) attacked.misfired = true;

    }

    allSunk() {
        if (this.shipCount === 0) return true;
        return false;
    }
}

module.exports = gameBoard;