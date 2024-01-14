import Player from './components/Player';
import Board from './components/Board';
import { useState } from 'react';
import { WIN_COMBOS } from '../win-combos';
import GameOver from './components/GameOver';

const PLAYERS = {
  O: 'Player 1',
  X: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// get the player with the current turn
function getCurrentTurn(gameMovess) {
  let currentPlayer = 'O';

  if (gameMovess.length > 0 && gameMovess[0].player === 'O') {
    currentPlayer = 'X';
  }

  return currentPlayer;
}

// get the current game board from all the game moves
function getGameBoard(gameMovess) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameMovess) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

// get player that wins
function getWinner(gameBoard, players) {
  let winner = null;

  for (const combo of WIN_COMBOS) {
    const firstSquare = gameBoard[combo[0].row][combo[0].column];
    const secondSquare = gameBoard[combo[1].row][combo[1].column];
    const thirdSquare = gameBoard[combo[2].row][combo[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }

  return winner;
}

function App() {
  const restartButtonClasses =
    'block mx-auto text-2xl bg-none border-solid border-2 border-[#f9e96e] text-[#f9e96e] py-2 px-4 cursor-pointer transition-all ease duration-200 shadow-[0_0_8px_rgba(255,187,0,0.4)] hover:bg-[#f1a065fa] hover:text-[#0d1706] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,187,0,0.8)]';
  const [players, setPlayers] = useState(PLAYERS);
  const [gameMoves, setgameMoves] = useState([]);

  const activePlayer = getCurrentTurn(gameMoves);
  const gameBoard = getGameBoard(gameMoves);
  const winner = getWinner(gameBoard, players);
  const hasDraw = gameMoves.length === 9 && !winner;

  // player makes a move
  function handleSelectSquare(rowIndex, colIndex) {
    setgameMoves((prevPlays) => {
      const activePlayer = getCurrentTurn(prevPlays);

      const updatePlays = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevPlays,
      ];

      return updatePlays;
    });
  }

  // restart game
  function handleRestart() {
    setgameMoves([]);
  }

  // player change name
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <header className='text-center'>
        <img
          src='/static/img/game-logo.png'
          className='w-40 object-cover mt-12 mb-4 mx-auto'
        ></img>
        <img
          src='/static/img/header.svg'
          className='w-96 object-cover mt-12 mb-4 mx-auto'
        ></img>
      </header>
      <div className='max-w-[95%] sm:w-[95%] sm:max-w-[45rem] my-12 mx-auto py-8 px-4 sm:px-8 rounded-lg bg-[#202b0a] shadow-[0_0_20px_rgba(0,0,0,0.5)] relative text-center'>
        <div className='flex flex-wrap justify-evenly items-center gap-8 p-0 sm:my-4 mx-0'>
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            currentTurn={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            currentTurn={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          ></Player>
        </div>
        {(winner || hasDraw) && (
          <GameOver onRestart={handleRestart} winner={winner}></GameOver>
        )}
        <Board onSelectSquare={handleSelectSquare} board={gameBoard}></Board>
        <button className={restartButtonClasses} onClick={handleRestart}>
          Restart
        </button>
      </div>
    </main>
  );
}

export default App;
