const EMPTY = null;
const PLAYER_X = 'X';
const PLAYER_O = 'O';

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

const isBoardFull = (squares) => squares.every(cell => cell !== EMPTY);

const minimax = (board, depth, isMaximizing) => {
    const winner = calculateWinner(board);
    if (winner === PLAYER_X) return -10;
    if (winner === PLAYER_O) return 10;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === EMPTY) {
                board[i] = PLAYER_O;
                const score = minimax(board, depth + 1, false);
                board[i] = EMPTY;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === EMPTY) {
                board[i] = PLAYER_X;
                const score = minimax(board, depth + 1, true);
                board[i] = EMPTY;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const getBestMove = (board) => {
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === EMPTY) {
            board[i] = PLAYER_O;
            const score = minimax(board, 0, false);
            board[i] = EMPTY;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
};

module.exports = { getBestMove };
