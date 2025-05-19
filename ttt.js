// SET OF 9 BOXES (WHICH MAKES A GRID)
let boxes = document.querySelectorAll(".box");

// RESET BUTTON FOR THE GAME
let reset = document.querySelector(".resetBtn");

// TEXT WHICH SHOWS WHO WON THE GAME
let para = document.querySelector(".winner");

// INITIALISING THE FIRST TURN TO PLAYER 'O'
let turnO = true;
para.innerText = "O's Turn";

// DEFINED CIRCLE AND CROSS ICONS AS O AND X
let O = `<img src="circle.png" alt="O" class="icon">`;
let X = `<img src="cross.png" alt="X" class="icon">`;

// DEFINED ALL THE WINNING PATTERNS AS AN ARRAY
const winPatt = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// ADDING EVENT LISTENERS TO EACH BOX
boxes.forEach((box) => {
  // ON CLICKING IT MARKS A MOVE AND SETS THE TURN FOR ANOTHER PLAYER (ALTERNATIVELY)
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = O;
      turnO = false;
    } else {
      box.innerHTML = X;
      turnO = true;
    }

    box.disabled = true; // DISABLED THE USED BOX (TO PREVENT MULTIPLE CLICKS)
    winCheck(); // AFTER EVERY MOVE, CHECK IF SOMEONE WON
  });

  // HOVER EFFECT FOR THE BOXES
  box.addEventListener("mouseover", () => {
    box.style.backgroundColor = "#2b3d59";
  });

  box.addEventListener("mouseout", () => {
    box.style.backgroundColor = "";
  });
});

// HOVER EFFECT FOR RESET BUTTON
reset.addEventListener("mouseover", () => {
  reset.style.backgroundColor = "#748cab";
});
reset.addEventListener("mouseout", () => {
  reset.style.backgroundColor = "";
});

//---FUNCTIONS---//

// FUNCTION FOR RESET BUTTON (WHICH RESETS THE GAME)
reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerHTML = ""; // CLEARS ALL THE PAST MOVES
    box.disabled = false; // ENABLES THE BOXES ONCE AGAIN
  });

  turnO = true; // AGAIN SETS THE FIRST MOVE FOR PLAYER 'O'
  reset.innerText = "Reset Game";
  para.innerText = "O's Turn"; // CLEARS WINNER TEXT
});

// FUNCTION WHICH CHECKS FOR A WIN EVERYTIME A NEW ENTRY IS MADE
const winCheck = () => {
  if(turnO)
    para.innerText = "O's Turn"
  else
    para.innerText = "X's Turn"

  for (let patt of winPatt) {
    let pos1img = boxes[patt[0]].innerHTML;
    let pos2img = boxes[patt[1]].innerHTML;
    let pos3img = boxes[patt[2]].innerHTML;

    // IF ALL THREE POSITIONS ARE FILLED IN A PATTERN
    if (pos1img !== "" && pos2img !== "" && pos3img !== "") {
      // AND ALL THREE ARE SAME, THEN IT'S A WIN
      if (pos1img === pos2img && pos2img === pos3img) {
        if (pos1img === O) {
          para.innerText = "'O' won the game";
          para.style.color = "#03d3fc";
        } else {
          para.innerText = "'X' won the game";
          para.style.color = "#03d3fc";
        }

        disAll(); // STOP THE GAME BY DISABLING ALL THE BOXES
        reset.innerText = "Play Again"; // CHANGING THE "RESET GAME" BUTTON TO "PLAY AGAIN" BUTTON
      }
    }
  }
};

// FUNCTION TO DISABLE ALL THE BOXES (WHEN THE GAME ENDS)
function disAll() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}
