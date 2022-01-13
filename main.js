const GRID_SIZE = 3;

const gameBoard = (() => {

    let _board;

    // clears the board
    const initBoard = () => { 
        _board = [
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined]
        ];
    };

    initBoard();

    const setSquare = (row, col, mark) => {
        _board[row][col] = mark;
    };

    function getBoard() {
        return _board;
    }

    return { setSquare, getBoard };

})();

function playerFactory(mark)  {
    let _mark = mark;

    const _values = {"X" : 1, "0" : -1};

    const getMark = () => _mark

    const makeMove = (square) => {
        // only continue if the current square is free
        if (square.innerText != "") {
            return
        }
        square.innerText = mark;
        gameBoard.setSquare(parseInt(square.dataset.row), parseInt(square.dataset.column), _values[mark]);
        game.updateState();
        game.toggleCurrentPlayer();

    }

    return { getMark, makeMove }

}


const game = (() => {

    let _p1 = playerFactory("X");
    let _p2 = playerFactory("0");

    // used to find sum of an array
    const _reducer = (num1, num2) => num1 + num2;

    let _currentPlayer = _p1;

    const getCurrentPlayer = () => {
        return _currentPlayer;
    };

    const toggleCurrentPlayer = () => {
        if (_currentPlayer == _p1) {
            _currentPlayer = _p2;
        } else {
            _currentPlayer = _p1;
        };
    }

    const _checkRows = () => {
        let board = gameBoard.getBoard();
        for (let i = 0; i < GRID_SIZE; i++) {
            let sum = board[i].reduce(_reducer)
            if (sum == 3 || sum == -3) {
                return true;
            }
        }
        return false;
    }

    const _checkColumns = () => {
        let board = gameBoard.getBoard();
        let columns = [0, 0, 0];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                columns[j] += board[i][j];
            }
        }
        for (let i = 0; i < 3; i++) {
            if (columns[i] == 3 || columns[i] == -3) {
                return true;
            }
        }

        return false;
    }

    const _checkDiags = () => {
        let board = gameBoard.getBoard();
        // this is gross and you need to change it (refactor with magic squares?)
        let diag1 = board[0][0] + board[1][1] + board[2][2];
        let diag2 = board[0][2] + board[1][1] + board[2][0];

        if (diag1 == 3 || diag1 == -3 || diag2 == 3 || diag2 == -3) {
            return true;
        }

        return false;
    }


    // returns true if a player has won, potentially take in a mark param?
    const _checkWin = () => {
        if (_checkColumns()) {
            return true;
        } else if (_checkRows()) {
            return true;
        } else if (_checkDiags()) {
            return true;
        } else {
            return false;
        }
    }

    // returns True if the board is full ie. there is a draw
    const _checkDraw = () => {
        let board = gameBoard.getBoard();
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (board[i][j] === undefined) {
                    return false;
                };
            };
        };
        return true;
    }


    const updateState = (state) => {
        if (_checkWin()) {
            displayController.endScreen(`${_currentPlayer.getMark()} Wins`);
        } else if (_checkDraw()) {
            displayController.endScreen("Game ended in a draw");
        } 

    }

    return { getCurrentPlayer, toggleCurrentPlayer, updateState }
    
})();

const displayController = (() => {

    const container = document.querySelector("#container");

    const drawBoard = () => {
        const board = document.createElement("div");
        board.id = "board"
        for (let i = 0; i < GRID_SIZE; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < GRID_SIZE; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.row = i;
                square.dataset.column = j
                square.addEventListener('click', () => {
                    game.getCurrentPlayer().makeMove(square);
                })
                row.appendChild(square);
            };
            board.appendChild(row);
        };
        container.appendChild(board);
    };

    const _removeBoard = () => {
        const board = document.querySelector("#board");
        const container = document.querySelector("#container");
        container.removeChild(board)
    }

    const _restart = () => {
        location.reload();
    }

    const endScreen = (message) => {
        _removeBoard()
        const endMenu = document.createElement("div");
        endMenu.classList.add("endMenu")
        const messageBox = document.createElement("div");
        messageBox.classList.add("messageBox")
        const restart = document.createElement("button");
        restart.classList.add("restart")
        messageBox.textContent = message;
        restart.textContent = "↺";
        restart.addEventListener('click', _restart);
        endMenu.appendChild(messageBox);
        endMenu.appendChild(restart);
        container.appendChild(endMenu);

    }

    return { drawBoard, endScreen };
})();

displayController.drawBoard();
