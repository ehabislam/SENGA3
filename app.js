/* Course: SENG 513 */
/* Date: Nov 13, 2023 */
/* Assignment 3 */
/* Name: Ehab Islam */
/* UCID: 30105153 */

// Title: Chess.
// Target Platform: Mobile and Desktop.
// Game Genre: Board Strategy.
// Games Objective: Chess game; First player to checkmate wins.
// Rules of the Game: https://www.chess.com/learn-how-to-play-chess.
// Game Mechanics: Drag and drop a piece to desired square, if the move is valid the piece will be moved to the square.

let turnDisplay = document.getElementById("turn");
const gameBoard = document.getElementById("gameBoard");
let whiteKills = [];
let blackKills = [];
let playerTurn = "White";
let killedLight = [];
let killedDark = [];
let check = false;
let inCheckColor = "";
let restart = false;
let GameBoard = [
  [
    rookDarkL,
    knightDarkL,
    bishopDarkL,
    queenDark,
    kingDark,
    bishopDarkR,
    knightDarkR,
    rookDarkR,
  ],
  [
    pawnDark1,
    pawnDark2,
    pawnDark3,
    pawnDark4,
    pawnDark5,
    pawnDark6,
    pawnDark7,
    pawnDark8,
  ],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  [
    pawnLight1,
    pawnLight2,
    pawnLight3,
    pawnLight4,
    pawnLight5,
    pawnLight6,
    pawnLight7,
    pawnLight8,
  ],
  [
    rookLightL,
    knightLightL,
    bishopLightL,
    queenLight,
    kingLight,
    bishopLightR,
    knightLightR,
    rookLightR,
  ],
];

let chars = ["a", "b", "c", "d", "e", "f", "g", "h"];
//loads the board for the first time
function loadGameBoard() {
  let squareColour;
  let counter = 0;
  GameBoard.forEach((row, i) => {
    row.forEach((piece, j) => {
      const square = document.createElement("div");
      square.innerHTML = piece === "" ? piece : piece.svg;
      square.classList.add("square");
      square.firstChild?.setAttribute("draggable", true);
      squareColour = (i + j) % 2 === 0 ? "light" : "dark";
      square.classList.add(squareColour);
      square.classList.add(counter);
      let squareId = chars[j] + (8 - i);
      square.id = squareId;
      square.classList.add(squareId);
      gameBoard.append(square);
      counter += 1;
    });
  });
}
loadGameBoard();
turnDisplay.innerHTML = `It is ${playerTurn}'s Turn`;
turnDisplay.className = playerTurn.toLowerCase();

const allSquares = document.querySelectorAll("#gameBoard .square");
//adds all the listeners to the squares
allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
  square.addEventListener("mouseover", hoverMoves);
  square.addEventListener("mouseout", hoverClear);
});

//clears the highlighted squares after mouse goes away
function hoverClear() {
  allSquares.forEach((square) => {
    if (!square.classList.contains("inCheck")) {
      square.style.border = "none";
    }
  });
}
//highlights the squares on mouse over
function hoverMoves(e) {
  pieceColor = e.target.classList[1];

  if (
    (playerTurn == "White" && pieceColor == "lightp") ||
    (playerTurn == "Black" && pieceColor == "darkp")
  ) {
    moveList = getMoves(e);
    for (const squareID of moveList[0]) {
      squareToHighlight = document.getElementById(squareID);
      if (squareToHighlight != null) {
        squareToHighlight.style.border = "medium dashed green";
      }
    }
    for (const squareID of moveList[1]) {
      squareToHighlight = document.getElementById(squareID);
      if (squareToHighlight != null) {
        squareToHighlight.style.border = "medium dashed red";
      }
    }
  }
}
//return a boolean in the move is valid
function validMove(e) {}

//return piece type for easy parsing
function getPieceType(pieceID) {
  if (pieceID.includes("king")) {
    pieceType = "king";
  } else if (pieceID.includes("queen")) {
    pieceType = "queen";
  } else if (pieceID.includes("pawn")) {
    pieceType = "pawn";
  } else if (pieceID.includes("rook")) {
    pieceType = "rook";
  } else if (pieceID.includes("bishop")) {
    pieceType = "bishop";
  } else if (pieceID.includes("knight")) {
    pieceType = "knight";
  }
  return pieceType;
}

//return moves based on piece type
function getMoves(e) {
  currentCell = e.target.offsetParent.id;
  currentColumn = currentCell[0];
  currentRow = currentCell[1];
  pieceColor = e.target.classList[1];
  pieceType = getPieceType(e.target.id);
  if (pieceType === "knight") {
    return getKnightMove(currentRow, currentColumn, pieceColor);
  } else if (pieceType === "pawn") {
    return getPawnMove(currentRow, currentColumn, pieceColor);
  } else if (pieceType === "rook") {
    return getRookMove(currentRow, currentColumn, pieceColor);
  } else if (pieceType === "bishop") {
    return getBishopMove(currentRow, currentColumn, pieceColor);
  } else if (pieceType === "queen") {
    return getQueenMove(currentRow, currentColumn, pieceColor);
  } else if (pieceType === "king") {
    return getKingMove(currentRow, currentColumn, pieceColor);
  }
}

//returns all the moves the enemy can do
function getAllEnemyMoves() {
  allEnemyPieces = {};
  pieceColor = "";
  movesList = [];
  if (playerTurn === "White") {
    allEnemyPieces = document.querySelectorAll(" .darkp");
    pieceColor = "darkp";
  } else if (playerTurn === "Black") {
    allEnemyPieces = document.querySelectorAll(" .lightp");
    pieceColor = "lightp";
  }
  allEnemyPieces.forEach((piece) => {
    pieceCell = piece.parentElement.id;
    row = pieceCell[1];
    column = pieceCell[0];
    pieceType = getPieceType(piece.id);
    if (pieceType === "knight") {
      moves = getKnightMove(row, column, pieceColor);
      movesList = movesList.concat(moves[0].concat(moves[1]));
    } else if (pieceType === "pawn") {
      moves = getPawnMove(row, column, pieceColor);
      movesList = movesList.concat(moves[0].concat(moves[1]));
    } else if (pieceType === "rook") {
      moves = getRookMove(row, column, pieceColor);
      movesList = movesList.concat(moves[0].concat(moves[1]));
    } else if (pieceType === "bishop") {
      moves = getBishopMove(row, column, pieceColor);
      movesList = movesList.concat(moves[0].concat(moves[1]));
    } else if (pieceType === "queen") {
      moves = getQueenMove(row, column, pieceColor);
      movesList = movesList.concat(moves[0].concat(moves[1]));
    } else if (pieceType === "king") {
      moves = getKingMove(row, column, pieceColor);
      movesList = movesList.concat(moves[0].concat(moves[1]));
    }
  });
  return movesList;
}

//checks if the square is empty
function squareEmpty(e, startDraggedElement) {
  moves = getMoves(startDraggedElement);
  allMoves = moves[0].concat(moves[1]);
  if (e.target.firstChild == null) {
    if (allMoves.includes(e.target.id)) return true;
  }
  return false;
}

//checks if the square has enemy
function squareEnemy(e, startDraggedElement) {
  moves = getMoves(startDraggedElement);
  allMoves = moves[0].concat(moves[1]);
  if (e.target.firstChild != null) {
    if (
      moves[1].includes(e.target.offsetParent.id) &&
      ((playerTurn === "White" && e.target.classList[1] === "darkp") ||
        (playerTurn === "Black" && e.target.classList[1] === "lightp"))
    )
      return true;
  }
  return false;
}

function ifPieceTurn(piece) {}

//changes the turns
function changeTurns() {
  playerTurn = playerTurn == "White" ? "Black" : "White";
  turnDisplay.innerHTML = `It is ${playerTurn}'s Turn`;
  turnDisplay.className = playerTurn.toLowerCase();
}

//checks the turn
function ifTurn(draggedPiece) {
  draggedPiece.classList[1];
  return (
    (playerTurn == "White" && draggedPiece.classList[1] == "lightp") ||
    (playerTurn == "Black" && draggedPiece.classList[1] == "darkp")
  );
}

function checkPieceMove() {}
let startPositionID;
let draggedElement;
let startDraggedElement;

//starts drag event for pieces
function dragStart(e) {
  startPositionID = e.target.parentNode.getAttribute("id");
  draggedElement = e.target;
  startDraggedElement = e;
}
//handles drop event for pieces
function dragDrop(e) {
  e.stopPropagation();
  parentSquare = e.target.parentElement;
  // if ValidMove then complete piece drag
  // Check if square is empty and then check if the move is valid
  // Check if square is occupied
  // If occupied by opposite piece and valid move
  // take piece and move to square
  // If occupied by same piece then reject move
  if (squareEmpty(e, startDraggedElement) && ifTurn(draggedElement)) {
    e.target.append(draggedElement);
    if (e.target.firstChild == draggedElement) {
      changeTurns();
      hoverClear();
    }
  }
  if (squareEnemy(e, startDraggedElement) && ifTurn(draggedElement)) {
    const killed = document.createElement("div");
    killed.classList.add("killed");
    if (playerTurn === "White") {
      killedDark.push(e.target.id);
      killed.append(e.target.childNodes[0]);
      document.getElementById("killedDark").append(killed);
    } else if (playerTurn === "Black") {
      killed.append(e.target.childNodes[0]);
      document.getElementById("killedLight").append(killed);
      killedLight.push(e.target.id);
    }
    parentSquare.innerHTML = "";
    parentSquare.append(draggedElement);
    if (parentSquare.firstChild == draggedElement) {
      changeTurns();
      hoverClear();
    }
  }
  inCheck();
  calculateWin();
  restartGame();
}

function dragOver(e) {
  e.preventDefault();
}

function getKingPosition(color) {}

//checks if king is in check
function inCheck() {
  allEnemyMoves = getAllEnemyMoves();
  if (playerTurn === "White") {
    kingCellWhite = document.getElementById("kingLight").parentElement;
    if (allEnemyMoves.includes(kingCellWhite.id)) {
      kingCellWhite.style.border = "medium dashed yellow";
      kingCellWhite.classList.add("inCheck");
      check = true;
      inCheckColor = "light";
    }
    console.log(allEnemyMoves, kingCellWhite);
    return;
  } else if (playerTurn === "Black") {
    kingCellDark = document.getElementById("kingDark").parentElement;
    if (allEnemyMoves.includes(kingCellDark.id)) {
      kingCellDark.style.border = "medium dashed yellow";
      kingCellDark.classList.add("inCheck");
      check = true;
      inCheckColor = "dark";
    }
    console.log(allEnemyMoves, kingCellDark);
    return;
  }
}
//calculates wins
function calculateWin() {
  if (check) {
    pawnScore = 1;
    strongPieceScore = 3;
    queenScore = 5;
    whiteScore = 0;
    blackScore = 0;
    for (killed of killedLight) {
      type = getPieceType(killed);
      if (type === "pawn") {
        blackScore = blackScore + pawnScore;
      }
      if (type === "rook" || type === "bishop" || type === "knight") {
        blackScore = blackScore + strongPieceScore;
      }
      if (type === "queen") {
        blackScore = blackScore + queenScore;
      }
    }
    for (killed of killedDark) {
      type = getPieceType(killed);
      if (type === "pawn") {
        whiteScore = whiteScore + pawnScore;
      }
      if (type === "rook" || type === "bishop" || type === "knight") {
        whiteScore = whiteScore + strongPieceScore;
      }
      if (type === "queen") {
        whiteScore = whiteScore + queenScore;
      }
    }

    if (whiteScore > blackScore) {
      restart = confirm(
        `White wins with score ${whiteScore}!!! \n Press Okay to restart.`
      );
    } else if (whiteScore < blackScore) {
      restart = confirm(
        `Black wins with score ${blackScore}!!! \n Press Okay to restart.`
      );
    } else if ((whiteScore = blackScore)) {
      restart = confirm(`Draw as score is same \n Press Okay to restart.`);
    }
  }
}

//restart the game
function restartGame() {
  if (restart) {
    location.reload();
  }
}

//popup handler
window.addEventListener("load", function () {
  setTimeout(function open(event) {
    document.querySelector(".popup").style.display = "block";
  }, 1000);
});
document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});
document.querySelector("#closed").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});
