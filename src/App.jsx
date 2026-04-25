import { useState } from "react";

function Square({ state, onSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9"
      onClick={onSquareClick}
    >
      {state}
    </button>
  );
}

function Board({ squares, isXNext, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    if (isXNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  return (
    <>
      <h1 className="mb-4">{status}</h1>
      <div className="flex">
        <Square onSquareClick={() => handleClick(0)} state={squares[0]} />
        <Square onSquareClick={() => handleClick(1)} state={squares[1]} />
        <Square onSquareClick={() => handleClick(2)} state={squares[2]} />
      </div>
      <div className="flex">
        <Square onSquareClick={() => handleClick(3)} state={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} state={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} state={squares[5]} />
      </div>
      <div className="flex">
        <Square onSquareClick={() => handleClick(6)} state={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} state={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} state={squares[8]} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXNext, setNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setNext(!isXNext);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setNext(move % 2 === 0);
  }

  const move = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div>
      <div>
        {/* Board */}
        <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        {/* History */}
        <div>
          <ol>{move}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
}
