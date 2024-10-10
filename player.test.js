const Player = require('./player.js');

test("creates a player", () => {
    const player1 = new Player();
    expect(player1).toBeDefined();
});