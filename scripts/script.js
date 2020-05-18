const Gameboard = (() => {
    let gameBoardArray = [];
    const gameContainer = document.getElementById("game-container");
    const endScreenText = document.getElementById("win-lose-tie");
    const resetBoard = (reset) => {
        endScreenText.textContent = "";
        gameBoardArray.length = 0;
        if(reset == "reset") {
            gameContainer.childNodes.forEach(child => {
                child.textContent = "";
                gameBoardArray.push(child.textContent);
            });
            return;
        } else {
            for(i = 0; i < 9; i++) {
                let gameCell = document.createElement("div");
                gameCell.className = "game-cell";
                gameCell.textContent = "";
                gameCell.id = `cell${i}`;
                gameBoardArray.push(gameCell.textContent);
                gameContainer.appendChild(gameCell);
            };
        };
    };
    function updateArray() {
        for(i = 0; i < gameBoardArray.length; i++) {
            let gameCell = document.getElementById(`cell${i}`);
            gameBoardArray[i] = gameCell.textContent;
        };
    };
    function checkWinner() {
        const endScreenOverlay = document.getElementById("game-end-overlay");
        let playerOne = document.getElementById("display-player-one").textContent;
        let playerTwo = document.getElementById("display-player-two").textContent;
        if(gameBoardArray[0] != "" && gameBoardArray[0] == gameBoardArray[1] && gameBoardArray[1] == gameBoardArray[2]) {
            if(gameBoardArray[0] == "0") {
                endScreenText.textContent = `${playerOne} Won!`;
            } else {
                endScreenText.textContent = `${playerTwo} Won!`;
            };
        } else if(gameBoardArray[3] != "" && gameBoardArray[3] == gameBoardArray[4] && gameBoardArray[4] == gameBoardArray[5]) {
            if(gameBoardArray[3] == "0") {
                endScreenText.textContent = `${playerOne} Won!`;
            } else {
                endScreenText.textContent = `${playerTwo} Won!`;
            };
        } else if(gameBoardArray[6] != "" && gameBoardArray[6] == gameBoardArray[7] && gameBoardArray[7] == gameBoardArray[8]) {
            if(gameBoardArray[6] == "0") {
                endScreenText.textContent = `${playerOne} Won!`;
            } else {
                endScreenText.textContent = `${playerTwo} Won!`;
            };
        } else if(gameBoardArray[0] != "" && gameBoardArray[0] == gameBoardArray[3] && gameBoardArray[3] == gameBoardArray[6]) {
            if(gameBoardArray[0] == "0") {
                endScreenText.textContent = `${playerOne} Won!`;
            } else {
                endScreenText.textContent = `${playerTwo} Won!`;
            };
        } else if(gameBoardArray[1] != "" && gameBoardArray[1] == gameBoardArray[4] && gameBoardArray[4] == gameBoardArray[7]) {
            if(gameBoardArray[1] == "0") {
                endScreenText.textContent = `${playerOne} Won!`;
            } else {
                endScreenText.textContent = `${playerTwo} Won!`;
            };
        } else if(gameBoardArray[2] != "" && gameBoardArray[2] == gameBoardArray[5] && gameBoardArray[5] == gameBoardArray[8]) {
            if(gameBoardArray[2] == "0") {
                endScreenText.textContent = `${playerOne} Won!`;
            } else {
                endScreenText.textContent = `${playerTwo} Won!`;
            };
        } else if(gameBoardArray[0] != "" && gameBoardArray[0] == gameBoardArray[4] && gameBoardArray[4] == gameBoardArray[8]) {
            if(gameBoardArray[0] == "0") {
                endScreenText.textContent = `${playerOne} Won!`;
            } else {
                endScreenText.textContent = `${playerTwo} Won!`;
            };
        } else if(gameBoardArray[2] != "" && gameBoardArray[2] == gameBoardArray[4] && gameBoardArray[4] == gameBoardArray[6]) {
            if(gameBoardArray[2] == "0") {
                endScreenText.textContent = `${playerOne} Won!`;
            } else {
                endScreenText.textContent = `${playerTwo} Won!`;
            };
        } else {
            for(i = 0; i < gameBoardArray.length; i++) {
                if(gameBoardArray[i] == "") {
                    return;
                } else {
                    endScreenText.textContent = `It's a tie!`;
                };
            };
        };
        if(endScreenText.textContent != "") {
            endScreenOverlay.className = "game-end-overlay-display";
        }
    };
    resetBoard();
    return {resetBoard, updateArray, checkWinner};
})();
const Game = (() => {
    let playerOne;
    let playerTwo;
    let currentTurn = "0";
    const overlay = document.getElementById("overlay");
    const endGameOverlay = document.getElementById("game-end-overlay");
    function playAgain() {
        endGameOverlay.className = "game-end-overlay-hidden";
        Gameboard.resetBoard("reset");
        turnNumber = 1;
        gameCells.forEach(cell => {
            cell.className = 'game-cell';
        });
        Game();
    }
    let turnNumber = 1;
    function singleOrMultiPlay(singleMulti) {
        const playerOneName = document.getElementById("player-one-name");
        const playerTwoName = document.getElementById("player-two-name");
        const playerOneDisplayName = document.getElementById("display-player-one");
        const playerTwoDisplayName = document.getElementById("display-player-two");
        if (singleMulti == "single") {
            gameCells.forEach(cell => {
                cell.addEventListener('click', function() {
                    if(checkLegalMove(cell) == true) {
                        cell.textContent = currentTurn;
                        gameCells.forEach(cell => {
                            cell.className = 'game-cell-no-pointer';
                        });
                        Gameboard.updateArray();
                        Gameboard.checkWinner();
                        turnNumber += 1;
                        if(endGameOverlay.className == "game-end-overlay-hidden" && turnNumber <= 5) { 
                            let randomTimeout = Math.floor(Math.random() * 1500);
                            checkTurn();
                            function enableListener() {
                                gameCells.forEach(cell => {
                                    cell.className = 'game-cell';
                                });
                            };
                            setTimeout(enableListener, randomTimeout+200);
                            setTimeout(aiPlay, randomTimeout);
                        };
                    } else {
                        return;
                    }
                });
            });
            if(playerOneName.value == "") {
                playerOne = new Player("Player One", "0");
                playerOneName.value = "Player One";
                playerOneDisplayName.textContent = playerOneName.value;
                playerTwo = new Player("Computer", "X");
                playerTwoName.value = "Computer";
                playerTwoDisplayName.textContent = playerTwoName.value;
            } else {
                playerOne = new Player(playerOneName.value, "0");
                playerOneDisplayName.textContent = playerOneName.value;
                playerTwo = new Player("Computer", "X");
                playerTwoName.value = "Computer";
                playerTwoDisplayName.textContent = playerTwoName.value;
            }
        } else {
            gameCells.forEach(cell => {
                cell.addEventListener('click', function() {
                    if(checkLegalMove(cell) == true) {
                        cell.textContent = currentTurn;
                        Gameboard.updateArray();
                        Gameboard.checkWinner();
                        checkTurn();
                    } else {
                        return;
                    };
                });
                console.log()
            });
            if(playerOneName.value == "" && playerTwoName.value == "") {
                playerOne = new Player("Player One", "0");
                playerOneName.value = "Player One";
                playerOneDisplayName.textContent = playerOneName.value;
                playerTwo = new Player("player Two", "X");
                playerTwoName.value = "Player Two";
                playerTwoDisplayName.textContent = playerTwoName.value;
            } else if(playerOneName == "") {
                playerOne = new Player("Player One", "0");
                playerTwo = new Player(playerTwoName.value, "X");
                playerTwoDisplayName.textContent = playerTwoName.value;
                playerOneName.value = "Player One";
                playerOneDisplayName.textContent = playerOneName.value;
            } else if(playerTwoName == "") {
                playerOne = new Player(playerOneName.value, "X");
                playerOneDisplayName.textContent = playerOneName.value;
                playerTwo = new Player("Player Two", "X");
                playerTwoName.value = "Player Two";
                playerTwoDisplayName.textContent = playerTwoName.value;
            }
            else {
                playerOne = new Player(playerOneName.value, "0");
                playerTwo = new Player(playerTwoName.value, "X");
                playerOneDisplayName.textContent = playerOneName.value;
                playerTwoDisplayName.textContent = playerTwoName.value;
            }
        }
        overlay.className = "overlay-hidden";
    };
    function checkTurn() {
        const turn0 = document.getElementById("team-0");
        const turnx = document.getElementById("team-x");
        if(currentTurn == "X") {
            currentTurn = "0";
            turnx.className = "team-display-x";
            turn0.className = "team-display-0-turn";
        } else {
            currentTurn = "X";
            turn0.className = "team-display-0";
            turnx.className = "team-display-x-turn";
        }
    return { currentTurn};
    };
    function checkLegalMove(cell) {
        if(cell.textContent != "X" && cell.textContent != "0") {
            return true;
        } else {
            return false;
        };
    };
    const gameCells = document.querySelectorAll(".game-cell");

    function aiPlay() {
        let randomNum = Math.floor(Math.random() * 9);
        let gameCell = document.getElementById(`cell${randomNum}`);
            while(checkLegalMove(gameCell) == false) {
                newNum = Math.floor(Math.random() * 9);
                gameCell = document.getElementById(`cell${newNum}`);
            };
            gameCell.textContent = currentTurn;
            Gameboard.updateArray();
            Gameboard.checkWinner();
        checkTurn();
    };
    console.log(currentTurn);
    return {singleOrMultiPlay, playAgain, aiPlay};
})();
function Player(name, team) {
    this.playerName = name;
    this.playerTeam = team;
}