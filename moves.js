/* Course: SENG 513 */
/* Date: Nov 13, 2023 */
/* Assignment 3 */
/* Name: Ehab Islam */
/* UCID: 30105153 */

// This js holds functions to define funtions to calculate piece moves

//Function that takes current Rook position and color
//and returns all possible places the piece can go
function getRookMove(currentRow, currentCol, color) {
  //Logic for moves
  currentSquare = document.getElementById(currentCol + currentRow);
  moves = [];
  killMoves = [];

  // Vertical and horizontal moves
  for (let offset of [-1, 1]) {
    let newRow = parseInt(currentRow) + offset;
    let newCol = currentCol;

    while (isValidMove(newRow, newCol)) {
      square = document.getElementById(newCol + newRow.toString());
      if (square.hasChildNodes()) {
        if (
          square.childNodes[0].classList[1] !=
          currentSquare.childNodes[0].classList[1]
        ) {
          killMoves.push(newCol + newRow.toString());
        }
        break;
      }
      moves.push(newCol + newRow.toString());
      newRow += offset;
    }

    newRow = currentRow;
    newCol = currentCol.charCodeAt(0) + offset;

    while (isValidMove(newRow, String.fromCharCode(newCol))) {
      square = document.getElementById(String.fromCharCode(newCol) + newRow);
      if (square.hasChildNodes()) {
        if (
          square.childNodes[0].classList[1] !=
          currentSquare.childNodes[0].classList[1]
        ) {
          killMoves.push(String.fromCharCode(newCol) + newRow);
        }
        break;
      }
      moves.push(String.fromCharCode(newCol) + newRow);
      newCol += offset;
    }
  }

  return [moves, killMoves];
}

//Function that takes current Knight position and color
//and returns all possible places the piece can go
function getKnightMove(currentRow, currentCol, color) {
  moves = [];
  killMoves = [];
  currentSquare = document.getElementById(currentCol + currentRow);

  const knightMoves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  for (const [rowOffset, colOffset] of knightMoves) {
    const newRow = parseInt(currentRow) + rowOffset;
    const newCol = String.fromCharCode(currentCol.charCodeAt(0) + colOffset);
    if (isValidMove(newRow, newCol)) {
      square = document.getElementById(newCol + newRow);

      if (square.hasChildNodes() && square != null) {
        if (
          square.childNodes[0].classList[1] !=
          currentSquare.childNodes[0].classList[1]
        ) {
          killMoves.push(newCol + newRow.toString());
        }
        continue;
      }
      validSquares = newCol + newRow.toString();
      moves.push(validSquares);
    }
  }

  return [moves, killMoves];
}

//Function that takes current Bishop position and color
//and returns all possible places the piece can go
function getBishopMove(currentRow, currentCol) {
  //Logic for moves
  moves = [];
  killMoves = [];
  currentSquare = document.getElementById(currentCol + currentRow);

  // Diagonal moves
  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 2) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 2) {
      let newRow = parseInt(currentRow) + rowOffset;
      let newCol = currentCol.charCodeAt(0) + colOffset;
      while (isValidMove(newRow, String.fromCharCode(newCol))) {
        square = document.getElementById(String.fromCharCode(newCol) + newRow);

        if (square.hasChildNodes()) {
          if (
            square.childNodes[0].classList[1] !=
            currentSquare.childNodes[0].classList[1]
          ) {
            killMoves.push(String.fromCharCode(newCol) + newRow);
          }
          break;
        }
        moves.push(String.fromCharCode(newCol) + newRow.toString());
        newRow += rowOffset;
        newCol += colOffset;
      }
    }
  }

  return [moves, killMoves];
}

//Function that takes current Pawn position and color
//and returns all possible places the piece can go
function getPawnMove(currentRow, currentCol, color, oponent) {
  //Logic for moves
  moves = [];
  killMoves = [];
  currentSquare = document.getElementById(currentCol + currentRow);
  // Assuming white pawns move upward (decreasing row)
  const direction = color === "lightp" ? 1 : -1;

  // Forward move
  newRow = parseInt(currentRow) + direction;
  if (isValidMove(newRow, currentCol)) {
    square = document.getElementById(currentCol + newRow);
    if (!square.hasChildNodes()) {
      moves.push(currentCol + newRow.toString());
      if (
        (color === "lightp" && parseInt(currentRow) === 2) ||
        (color === "darkp" && parseInt(currentRow) === 7)
      ) {
        square2 = document.getElementById(currentCol + (newRow + direction));
        if (!square2.hasChildNodes()) {
          moves.push(currentCol + (newRow + direction).toString());
        }
      }
    }
  }

  // Diagonal captures
  const nextCellLeft =
    String.fromCharCode(currentCol.charCodeAt(0) - 1) +
    (parseInt(currentRow) + direction);
  const nextCellRight =
    String.fromCharCode(currentCol.charCodeAt(0) + 1) +
    (parseInt(currentRow) + direction);

  leftCol = nextCellLeft[0];
  newRow = nextCellLeft[1];
  if (isValidMove(parseInt(newRow), leftCol)) {
    if (
      document.getElementById(nextCellLeft).hasChildNodes() &&
      document.getElementById(nextCellLeft).firstChild.classList[1] != color
    ) {
      moves.push(nextCellLeft);
      killMoves.push(nextCellLeft);
    }
  }

  rightCol = nextCellRight[0];
  newRow = nextCellRight[1];
  if (isValidMove(parseInt(newRow), rightCol)) {
    if (
      document.getElementById(nextCellRight).hasChildNodes() &&
      document.getElementById(nextCellRight).firstChild.classList[1] != color
    ) {
      moves.push(nextCellRight);
      killMoves.push(nextCellRight);
    }
  }
  return [moves, killMoves];
}

//Function that takes current King position and color
//and returns all possible places the piece can go
function getKingMove(currentRow, currentCol, color) {
  //Logic for moves
  moves = [];
  killMoves = [];
  currentSquare = document.getElementById(currentCol + currentRow);

  // Adjacent squares
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      if (rowOffset !== 0 || colOffset !== 0) {
        const newRow = parseInt(currentRow) + rowOffset;
        const newCol = String.fromCharCode(
          currentCol.charCodeAt(0) + colOffset
        );
        square = document.getElementById(newCol + newRow);
        if (isValidMove(newRow, newCol)) {
          if (square.hasChildNodes()) {
            if (
              square.childNodes[0].classList[1] !=
              currentSquare.childNodes[0].classList[1]
            ) {
              killMoves.push(newCol + newRow.toString());
            }
            continue;
          }
          moves.push(newCol + newRow.toString());
        }
      }
    }
  }

  return [moves, killMoves];
}

//Function that takes current Queen position and color
//and returns all possible places the piece can go
function getQueenMove(currentRow, currentCol, color) {
  //Logic for moves
  moves = [];
  killMoves = [];

  rookMoves = getRookMove(currentRow, currentCol);
  bishopMoves = getBishopMove(currentRow, currentCol);

  moves = rookMoves[0].concat(bishopMoves[0]);
  killMoves = rookMoves[1].concat(bishopMoves[1]);
  return [moves, killMoves];
}

function isValidMove(row, col) {
  return (
    row >= 1 &&
    row <= 8 &&
    col.charCodeAt(0) >= "a".charCodeAt(0) &&
    col.charCodeAt(0) <= "h".charCodeAt(0)
  );
}
