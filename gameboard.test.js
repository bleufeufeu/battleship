const gameBoard = require('./gameboard.js');

test("creates a board", () => {
    const newBoard = new gameBoard();
    expect(newBoard).toBeDefined();
});

test("can access squares of board", () => {
    const newBoard = new gameBoard();
    expect(newBoard.board[2][4].ship).toBeDefined();
});

test("can hit squares of board", () => {
    const newBoard = new gameBoard();
    newBoard.receiveAttack(3, 4);
    expect(newBoard.board[3][4].beenHit).toBe(true);
});

test("can place a ship", () => {
    const newBoard = new gameBoard();
    newBoard.placeShip(3, 4, length = 3, "horizontal");
    expect(newBoard.board[3][4].hasShip).toBe(true);
    expect(newBoard.board[4][4].hasShip).toBe(true);
    expect(newBoard.board[5][4].hasShip).toBe(true);
    newBoard.placeShip(4, 3, length = 3, "vertical");
    expect(newBoard.board[4][3].hasShip).toBe(false);
});

test("can hit a ship", () => {
    const newBoard = new gameBoard();
    newBoard.placeShip(3, 4, length = 3, "horizontal");
    newBoard.receiveAttack(3, 4);
    newBoard.receiveAttack(4, 4);
    expect(newBoard.board[3][4].ship.timesHit).toBe(2);
    expect(newBoard.board[5][4].ship.timesHit).toBe(2);
});

test("can misfire", () => {
    const newBoard = new gameBoard();
    newBoard.placeShip(3, 4, length = 3, "horizontal");
    newBoard.receiveAttack(2, 2);
    expect(newBoard.board[2][2].misfired).toBe(true);
});

test("can sink ships", () => {
    const newBoard = new gameBoard();
    newBoard.placeShip(3, 4, length = 1, "horizontal");
    newBoard.receiveAttack(3, 4);
    expect(newBoard.board[3][4].ship.isSunk()).toBe(true);
});

test("can detect if all ships sunk", () => {
    const newBoard = new gameBoard();
    newBoard.placeShip(3, 4, length = 1, "horizontal");
    newBoard.placeShip(1, 1, length = 1, "horizontal");
    newBoard.receiveAttack(3, 4);
    newBoard.receiveAttack(1, 1);
    expect(newBoard.allSunk()).toBe(true);
});

