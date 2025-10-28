import { useState } from "react";
import "./style.css";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

function Square({ value, onClick }: SquareProps) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [placar, setPlacar] = useState({ X: 0, O: 0 });

  function calculateWinner(squares: (string | null)[]) {
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

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `🎉 Vencedor: ${winner}`
    : `👉 Próximo jogador: ${isXNext ? "X" : "O"}`;

  function handleClick(i: number) {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const possibleWinner = calculateWinner(newSquares);
    if (possibleWinner) {
      setPlacar({
        ...placar,
        [possibleWinner]: placar[possibleWinner as "X" | "O"] + 1,
      });
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="game-container">
      <h1>🎮 Jogo da Velha</h1>
      <div className="board">
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => handleClick(i)} />
        ))}
      </div>

      <div className="status">{status}</div>

      <div className="placar">
        <h3>Placar:</h3>
        <p>X: {placar.X}</p>
        <p>O: {placar.O}</p>
      </div>

      <button className="reset-button" onClick={resetGame}>
        🔁 Reiniciar Jogo
      </button>
    </div>
  );
}
