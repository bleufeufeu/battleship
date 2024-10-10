const Ship = require('./ship.js');

test("creates a ship", () => {
    const newShip = new Ship(3);
    expect(newShip.length).toBe(3);
});

test("ship can be hit", () => {
    const newShip = new Ship(3);
    newShip.hit();
    expect(newShip.timesHit).toBe(1);
});

test("detects if ship is sunk", () => {
    const newShip = new Ship(3);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBeTruthy();
});