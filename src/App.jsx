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

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setNext] = useState(true);

  function handleClick(i) {
    if (squares[i]) return;

    const nextSquares = squares.slice();
    if (isXNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setNext(!isXNext);
  }

  return (
    <>
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
