// Add your javascript here

const cells = document.querySelectorAll(".cell");
//console.log(cells);
const ROWS = 6;
const COLS = 7;

let turn = "A";

cells.forEach((cell, index) =>
  cell.addEventListener("click", function (event) {
    console.log(event.target.innerText, index);
    if (validMove(index)) {
      event.target.innerText = turn;
      checkWinning(turn, index);
      turn = turn === "A" ? "B" : "A";
    }
  })
);

function validMove(index) {
  //console.log(index, index +COLS, cells[index+COLS].innerText);
  if (index > COLS * (ROWS - 1) - 1 && index < COLS * ROWS) {
    return true;
  } else if (index < 35 && cells[index + COLS].innerText) {
    return true;
  }
  return false;
}

function checkWinning(turn, index) {
  // check horizontal win
  horizontalWin(turn, index);
  //console.log(row, row_start, row_end);
  // check vertical win
  verticalWin(turn, index);
  // check diagonal win start at upper left
  upperLeftDiagonalWin(turn, index);
  // check diagonal win start at upper right
  upperRightDiagonalWin(turn, index);
  //alert(turn + ' wins!');
}

function upperRightDiagonalWin(turn, index) {
  console.log("upperRightDiagonalWin");
  let connected = 1;
  let row = Math.floor(index / COLS);
  let row_start = row * COLS;
  let row_end = row_start + COLS - 1;
  let local_index = index;
  if (row > 0 && local_index < row_end) {
    let up = row - 1;
    local_index = local_index - COLS + 1;
    row_end = up * COLS + COLS - 1;
    while (
      up >= 0 &&
      local_index <= row_end &&
      cells[local_index].innerText === turn
    ) {
      connected++;
      up--;
      row_end = up * COLS + COLS - 1;
      local_index = local_index - COLS + 1;
    }
  }
  console.log(connected);
  local_index = index;
  if (row < ROWS - 1 && local_index > row_start) {
    let down = row + 1;
    local_index = local_index + COLS - 1;
    row_start = down * COLS;
    while (
      down < ROWS &&
      local_index >= row_start &&
      cells[local_index].innerText === turn
    ) {
      connected++;
      down++;
      row_start = down * COLS;
      local_index = local_index + COLS - 1;
    }
  }
  console.log(connected);
  if (connected > 3) {
    console.log(turn + " wins!");
    const h1 = document.getElementById("winner");
    h1.innerText = turn + " wins!";
  }
}
function upperLeftDiagonalWin(turn, index) {
  console.log("upperLeftDiagonalWin");
  let connected = 1;
  let row = Math.floor(index / COLS);
  let row_start = row * COLS;
  let row_end = row_start + COLS - 1;
  let local_index = index;
  if (row > 0 && local_index > row_start) {
    let up = row - 1;
    local_index = local_index - COLS - 1;
    console.log("local_index", local_index);
    row_start = up * COLS;
    while (
      up >= 0 &&
      local_index >= row_start &&
      cells[local_index].innerText === turn
    ) {
      connected++;
      up--;
      row_start = up * COLS;
      local_index = local_index - COLS - 1;
      console.log("local_index", local_index, up, row_start);
    }
  }
  local_index = index;
  if (row < ROWS - 1 && local_index < row_end) {
    let down = row + 1;
    local_index = local_index + COLS + 1;
    row_end = down * COLS + COLS + 1;
    while (
      down < ROWS &&
      local_index <= row_end &&
      cells[local_index].innerText === turn
    ) {
      connected++;
      down++;
      row_end = down * COLS + COLS - 1;
      local_index = local_index + COLS + 1;
    }
  }
  console.log(connected);
  if (connected > 3) {
    console.log(turn + " wins!");
    const h1 = document.getElementById("winner");
    h1.innerText = turn + " wins!";
  }
}

function verticalWin(turn, index) {
  console.log("verticalWin");
  let connected = 1;
  let row = Math.floor(index / COLS);
  console.log("row", row);
  if (row > 0) {
    let up = row - 1;
    let local_index = index - COLS;
    while (up >= 0 && cells[local_index].innerText === turn) {
      connected++;
      up--;
      local_index -= COLS;
    }
  }
  console.log(connected);
  if (row < ROWS - 1) {
    let down = row + 1;
    let local_index = index + COLS;
    while (down < ROWS && cells[local_index].innerText === turn) {
      connected++;
      down++;
      local_index += COLS;
    }
  }
  console.log(connected);
  if (connected > 3) {
    console.log(turn + " wins!");
    const h1 = document.getElementById("winner");
    h1.innerText = turn + " wins!";
  }
}
function horizontalWin(turn, index) {
  console.log("horizontalWin");
  let connected = 1;

  let row = Math.floor(index / COLS);
  let row_start = row * COLS;
  let row_end = row_start + COLS - 1;
  //console.log(row, row_start, row_end);
  if (index > row_start) {
    let left = index - 1;

    while (left >= row_start && cells[left].innerText === turn) {
      connected++;
      left--;
    }
  }
  console.log(connected);
  if (index < row_end) {
    let right = index + 1;
    while (right <= row_end && cells[right].innerText === turn) {
      connected++;
      right++;
    }
  }
  console.log(connected);
  if (connected > 3) {
    console.log(turn + " wins!");
    const h1 = document.getElementById("winner");
    h1.innerText = turn + " wins!";
  }
}
