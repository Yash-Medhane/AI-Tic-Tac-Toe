const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const { getBestMove } = require('./ai');

const app = express();
const port = 5000;

app.use(cors()); // Use the cors middleware
app.use(bodyParser.json());

app.post('/move', (req, res) => {
    const board = req.body.board;
    console.log('Received board:', board);
    const bestMove = getBestMove(board);
    console.log('AI move:', bestMove);
    res.json({ move: bestMove });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});