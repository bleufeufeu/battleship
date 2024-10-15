import { gameBoard } from './gameboard.js';

export default class Player {
    constructor() {
        this.isCPU = false;
        this.gameboard = new gameBoard();
    }
}
