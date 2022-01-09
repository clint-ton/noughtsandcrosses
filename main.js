const gridSize = 3;

const gameBoard = (() => {
    let board = [
        [["X"], ["0"], ["X"]],
        [["0"], ["X"], ["0"]],
        [["X"], ["0"], ["X"]],
    ];
    // for (let i = 0; i < gridSize; i++) {
    //     board.push([])
    //     for (let j = 0; j < gridSize; j++) {
    //         board[i].push(" ");
    //     }
    // };


})();

const displayController = (() => {
    let drawBoard = () => {
        const board = document.querySelector("#board");
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < gridSize; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                row.appendChild(square);
            };
            board.appendChild(row);
        };
    };



    return { drawBoard };
})();

displayController.drawBoard();