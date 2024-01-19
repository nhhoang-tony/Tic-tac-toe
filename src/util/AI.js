import { WIN_COMBOS } from '../../win-combos';

const X = 'X';
const O = 'O';

// get the best move
export function getAiMove(gameBoard) {
  const aiMove = minimax(gameBoard);
  return aiMove;
}

// get the current player turn assuming X always goes first
function player(board) {
  const boardCopy = deepCopy(board);
  let xCount = 0;
  let oCount = 0;
  for (const [rowIndex, rowValue] of boardCopy.entries()) {
    for (const [colIndex, colValue] of rowValue.entries()) {
      if (colValue === X) {
        xCount++;
      }
      if (colValue === O) {
        oCount++;
      }
    }
  }

  if (xCount === oCount) {
    return X;
  } else if (xCount > oCount) {
    return O;
  }
}

// get all available moves/actions for a current board state
function actions(board) {
  const boardCopy = deepCopy(board);
  const actions = [];

  for (const [rowIndex, rowValue] of boardCopy.entries()) {
    for (const [colIndex, colValue] of rowValue.entries()) {
      if (colValue !== X && colValue !== O) {
        actions.push([rowIndex, colIndex]);
      }
    }
  }
  return actions;
}

// apply the move/action to the current board state
function result(board, action) {
  const boardCopy = deepCopy(board);

  if (boardCopy[action[0]][action[1]] !== null) {
    return 'Invalid';
  }

  boardCopy[action[0]][action[1]] = player(boardCopy);
  return boardCopy;
}

// check if any player wins
export function winner(board) {
  const boardCopy = deepCopy(board);
  let winner = null;

  for (const combo of WIN_COMBOS) {
    const firstSquare = boardCopy[combo[0].row][combo[0].column];
    const secondSquare = boardCopy[combo[1].row][combo[1].column];
    const thirdSquare = boardCopy[combo[2].row][combo[2].column];

    if (
      firstSquare !== null &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = firstSquare;
    }
  }

  return winner;
}

// if there's no winner and no available square, game ends
export function terminal(board) {
  const boardCopy = deepCopy(board);
  if (winner(boardCopy) !== null) {
    return true;
  } else {
    let emptyCount = 0;
    for (const [rowIndex, rowValue] of boardCopy.entries()) {
      for (const [colIndex, colValue] of rowValue.entries()) {
        if (colValue !== X && colValue !== O) {
          emptyCount++;
          break;
        }
      }
    }

    if (emptyCount === 0) {
      return true;
    } else {
      return false;
    }
  }
}

// get the score for the current game (-1 = O wins; 0 = draw; 1 = X wins)
function utility(board) {
  const boardCopy = deepCopy(board);
  if (winner(boardCopy) === X) {
    return 1;
  } else if (winner(boardCopy) === O) {
    return -1;
  } else {
    return 0;
  }
}

// play X tries to maximise the score
function maxValue(board) {
  const boardCopy = deepCopy(board);
  if (terminal(boardCopy)) {
    return utility(boardCopy);
  }

  let currentValue = -Infinity;
  for (const action of actions(boardCopy)) {
    currentValue = Math.max(currentValue, minValue(result(boardCopy, action)));
  }

  return currentValue;
}

// player O tries to minimise the score
function minValue(board) {
  const boardCopy = deepCopy(board);
  if (terminal(boardCopy)) {
    return utility(boardCopy);
  }

  let currentValue = Infinity;
  for (const action of actions(boardCopy)) {
    currentValue = Math.min(currentValue, maxValue(result(boardCopy, action)));
  }

  return currentValue;
}

// minimax ML function to retrieve the best move for each player
function minimax(board) {
  const boardCopy = deepCopy(board);
  const currentPlayer = player(boardCopy);
  let bestmove;

  if (currentPlayer === X) {
    let currentValue = -Infinity;
    for (const action of actions(boardCopy)) {
      const newValue = minValue(result(boardCopy, action));

      if (newValue > currentValue) {
        currentValue = newValue;
        bestmove = action;
      }
    }
  } else {
    let currentValue = Infinity;
    for (const action of actions(boardCopy)) {
      const newValue = maxValue(result(boardCopy, action));

      if (newValue < currentValue) {
        currentValue = newValue;
        bestmove = action;
      }
    }
  }

  return bestmove;
}

// deep copy variables in JavaScript
export function deepCopy(original) {
  if (Array.isArray(original)) {
    const copy = [];
    for (const [index, value] of original.entries()) {
      copy[index] = deepCopy(value);
    }
    return copy;
  } else if (typeof original === 'object' && original !== null) {
    const copy = {};
    for (const [key, value] of Object.entries(original)) {
      copy[key] = deepCopy(value);
    }
    return copy;
  } else {
    // Primitive value: atomic, no need to copy
    return original;
  }
}
