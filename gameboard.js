import Ship from './ship.js';

class Square {
    constructor() {
        this.ship = null;
        this.hasShip = false;
        this.misfired = false;
        this.beenHit = false;
    }
}

export class gameBoard {
    constructor() {
        this.board = this.createBoard(10);
        this.shipCount = 0;
    }

    createBoard(num) {
        let finalBoard = [];
        for (let i = 0; i < num; i++) {
            finalBoard[i] = [];
            for (let j = 0; j < num; j++) {
                finalBoard[i][j] = new Square();
            }
        }
        return finalBoard;
    }

    getSquare(x, y, arr) {
        if (x >= arr.length || y >= arr.length || x < 0 || y < 0) {
            return null;
        }
        return arr[x][y];
    }

    placeShip(x, y, length, orientation) {
        const ship = new Ship(length);

        let square = this.getSquare(x, y, this.board);

        if (orientation === "vertical" && y + length <= 10 && this.checkPlaceability(x, y, length, "vertical")) {
            for (let i = 0; i < length; i++) {
                square = this.getSquare(x, y+i, this.board);
                square.ship = ship;
                square.hasShip = true;
            }
            this.shipCount++;
        }
        if (orientation === "horizontal" && x + length <= 10 && this.checkPlaceability(x, y, length, "horizontal")) {
            for (let i = 0; i < length; i++) {
                square = this.getSquare(x+i, y, this.board);
                square.ship = ship;
                square.hasShip = true;
            }
            this.shipCount++;
        }
    }

    checkPlaceability (x, y, length, orientation) {
        if (orientation === "vertical") {
            if (y + length > 9) return false;
            for (let i = 0; i < length; i++) {
                if (this.getSquare(x, y+i, this.board).hasShip === true) {
                    return false;
                }
            }
        }

        if (orientation === "horizontal") {
            if (x + length > 9) return false;
            for (let i = 0; i < length; i++) {
                if (this.getSquare(x+i, y, this.board).hasShip === true) {
                    return false;
                }
            }
        }
        return true;
    }

    receiveAttack(x, y) {
        let attacked = this.getSquare(x, y, this.board);
        if (!attacked || attacked.beenHit) return;

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