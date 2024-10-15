import Player from './player.js';

const createGrid = (player) => {
    const container = document.querySelector(`#${player}-container`);

    for (let i = 0; i < 10; i++) {
        let row = document.createElement("div");
        row.id = `row-${i}`
        for (let j = 0; j < 10; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.style.width = "30px";
            square.style.height = "30px";
            square.id = `column-${j}`
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}

const gameLogic = (() => {
    const playerHuman = new Player();
    const playerCPU = new Player();
    playerCPU.isCPU = true;

    let gameOver = false;


    const initShips = () => {
        let shipOrder = [5, 4, 3, 3, 2]
        let i = 0;
        let j = 0;
        let randX, randY;

        while (i < shipOrder.length) {
            randX = Math.floor(Math.random() * 10);
            randY = Math.floor(Math.random() * 10);
            const currDirection = Math.random() < 0.5 ? "vertical" : "horizontal";
            if (playerHuman.gameboard.checkPlaceability(randX, randY, shipOrder[i], currDirection)) {
                playerHuman.gameboard.placeShip(randX, randY, shipOrder[i], currDirection);
                i++;
            }
        }

        while (j < shipOrder.length) {
            randX = Math.floor(Math.random() * 10);
            randY = Math.floor(Math.random() * 10);
            const currDirection = Math.random() < 0.5 ? "vertical" : "horizontal";
            if (playerCPU.gameboard.checkPlaceability(randX, randY, shipOrder[j], currDirection)) {
                playerCPU.gameboard.placeShip(randX, randY, shipOrder[j], currDirection);
                j++;
            }
        }
    }


    const playHumanTurn = (x, y) => {
        if (gameOver || playerCPU.gameboard.board[x][y].beenHit) return;

        playerCPU.gameboard.receiveAttack(x, y);

        if (playerCPU.gameboard.allSunk()) {
            gameOver = true;
            return;
        }

        let randX, randY;

        do {
            randX = Math.floor(Math.random() * 10);
            randY = Math.floor(Math.random() * 10);

        } while (playerHuman.gameboard.board[randX][randY].beenHit);

        playerHuman.gameboard.receiveAttack(randX, randY);

        if (playerHuman.gameboard.allSunk()) {
            gameOver = true;
            return;
        }
    }

    // const playCPUTurn = () => {
    //     if (gameOver || currentPlayer !== playerCPU) return;

    //     let randX, randY;

    //     do {
    //         randX = Math.floor(Math.random() * 10);
    //         randY = Math.floor(Math.random() * 10);

    //     } while (playerHuman.gameboard.board[randX][randY].beenHit);

    //     playerHuman.gameboard.receiveAttack(randX, randY);

    //     if (playerHuman.gameboard.allSunk()) {
    //         gameOver = true;
    //         return;
    //     }

    //     switchPlayer();
    // }

    return { playerHuman, playerCPU, initShips, playHumanTurn }
})();

const displayController = (() => {
    const findSquare = (x, y, player) => {
        let container = document.querySelector(`#${player}-container`);
        let row = container.querySelector(`#row-${x}`);
        let square = row.querySelector(`#column-${y}`);
    
        return square;
    }

    const clickCell = (x, y) => {
        gameLogic.playHumanTurn(x, y);
        displayCPUBoard();

        setTimeout(() => {
            displayHumanBoard();
        }, 500);
    }

    const initClicks = () => {
        const board = gameLogic.playerCPU.gameboard.board;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const tile = findSquare(i, j, "player2");
                tile.addEventListener("click", () => clickCell(i, j))
            }
        }
    }

    const displayHumanBoard = () => {
        const humanBoard = gameLogic.playerHuman.gameboard.board;
        for (let i = 0; i < humanBoard.length; i++) {
            for (let j = 0; j < humanBoard[i].length; j++) {
                const tile = findSquare(i, j, "player1");
                if (humanBoard[i][j].hasShip) {
                    tile.textContent = "O";
                }
                if (humanBoard[i][j].beenHit) {
                    tile.textContent = "X";
                }
                if (humanBoard[i][j].misfired) {
                    tile.textContent = "M"
                }
            }
        }
    }

    const displayCPUBoard = () => {
        const cpuBoard = gameLogic.playerCPU.gameboard.board;
        for (let i = 0; i < cpuBoard.length; i++) {
            for (let j = 0; j < cpuBoard[i].length; j++) {
                const tile = findSquare(i, j, "player2");
                if (cpuBoard[i][j].beenHit) {
                    tile.textContent = "X";
                }
                if (cpuBoard[i][j].misfired) {
                    tile.textContent = "M"
                }
            }
        }
    }

    const init = () => {
        createGrid("player1");
        createGrid("player2");
        initClicks();
        gameLogic.initShips();

        displayHumanBoard();
        displayCPUBoard();


    }

    return { init }
})();


// createGrid("player1");
// createGrid("player2");
// //gameLogic.playerHuman.gameboard.placeShip(3, 4, length = 3, "horizontal");
// //gameLogic.playerHuman.gameboard.placeShip(4, 5, length = 3, "horizontal");
// gameLogic.initShips();
// gameLogic.playerHuman.gameboard.receiveAttack(3, 4);
// gameLogic.playerHuman.gameboard.receiveAttack(9, 0);
// displayController.displayBoard();

displayController.init();