import { useState } from "react";

import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import Log from "./components/log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./components/winningcombination";

const initialGameBoard =[
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActicePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer='O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActicePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for(const turn of gameTurns){
        const {square, player} = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
    firstSquareSymbol === thirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.lenght === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) =>{
      const currentPlayer = deriveActicePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer}, 
        ...prevTurns,
      ];

        return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialname="player 1" symbol="X" isActive={activePlayer === 'X'}></Player>
          <Player initialname="player 2" symbol="O" isActive={activePlayer === 'O'}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard 
        onSelectSquare={handleSelectSquare} 
        board = {gameBoard}
        />
      </div>
     <Log turns = {gameTurns}/>
    </main>
  );
}

export default App
