/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
let turn =0;
let lastMove=[];

let currPlayer = 1; // active player: 1 or 2
let inactivePlayer =2;
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(width, height, board) {
  
 
  for(let i = 0; i <height; i++){
    let arr=[];
    for(let i = 0; i <width; i++){
      arr.push(null);
    }
  board.push(arr);
  }

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');
  //creates the top area of the board and loops to create each cell in it
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //loops to create the rest of the html board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  const pieces=document.querySelectorAll('.piece');
  let fullSpaces=[];
  for(let piece of pieces){
    fullSpaces.push(piece.parentElement.id);
  }
  let relSpace=fullSpaces.filter((spc)=>spc[2]===x.toString());
    const nextSpot= relSpace.map((spc)=> Number(spc[0])).reduce((acc, curr)=>Math.min(acc,curr),6)-1;
    return (nextSpot===-1) ? null:nextSpot;
  }

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  board[y].splice(x,1,currPlayer);
  turn++;
  lastMove=[y,x];

  const dropDistance =calculateDropDistance(y+1);
  let speed = dropDistance/280;

  const piece = document.createElement('div');
  piece.classList.add(`piece`,`p${currPlayer}`);

  const location= document.getElementById(`${y}-${x}`);
  location.appendChild(piece);

  piece.style.transform = `translate(0px,-${dropDistance}px)`;
  piece.style.transition=`transform ${speed}s ease-in`

  setTimeout(()=>{
  piece.style.transform = `translate(0px,0px)`
    piece.style.position='relative';
},40)
  
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  const message = document.createElement('div');
  const p = document.createElement('p')
  const board = document.getElementById('game');
  const restartBtn=document.createElement('btn');

  restartBtn.classList.add('restart');
  restartBtn.innerText='Restart Game'
  restartBtn.addEventListener('click',restartGame);

  p.innerText=msg;

  message.classList.add('message');
  message.appendChild(p)
  message.appendChild(restartBtn)
  
  board.appendChild(message);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  x=Number(x);

  // place piece in board and add to HTML table
  placeInTable(y, x);
 
  

  

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
 
  // check for tie
  if(board.every((spc)=>spc===null)){
    return endGame(`its a tie!`);
  }

  // switch players
  [currPlayer, inactivePlayer]=[inactivePlayer,currPlayer];
  botTurn(lastMove);


}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
//calulate the distance from the top to the open space for location and speed calculation
function calculateDropDistance(cell){
  const cellDist = 58.14;
  return cellDist*cell
}
//restart the game by clearing pieces and resetting counters and the board
const restartGame=()=>{
  const pieces = document.querySelectorAll('.piece');
  for(let piece of pieces){
    piece.remove();
  }
  document.querySelector('.message').remove();
  board=[];
  makeBoard(WIDTH, HEIGHT, board);
  turn=0;

}


function otherMove(){
  const [avSpots, enemy]=gameData('p1');
  
}

function SpotChecker([y,x], player){


}
makeBoard(WIDTH, HEIGHT, board);
makeHtmlBoard();
