const triangleButton = document.getElementById('triangle-selector');
const englishButton = document.getElementById('english-selector');
const europeanButton = document.getElementById('european-selector');

const triangleBoard = document.getElementById('triangle-container');
const englishBoard = document.getElementById('english-container');
const europeanBoard = document.getElementById('european-container');

let selectedBoard = 'triangle';

let gameStartedTriangle = false;
let gameStartedEnglish = false;
let gameStartedEuropean = false;

triangleButton.addEventListener("click", () => {
  selectedBoard = 'triangle';
  englishBoard.style.display = "none";
  europeanBoard.style.display = "none";
  triangleBoard.style.display = "block";
  hideAndShowShaker();
});

englishButton.addEventListener("click", () => {
  selectedBoard = 'english';
  triangleBoard.style.display = "none";
  europeanBoard.style.display = "none";
  englishBoard.style.display = "block";
  hideAndShowShaker();
});

europeanButton.addEventListener("click", () => {
  selectedBoard = 'european';
  triangleBoard.style.display = "none";
  englishBoard.style.display = "none";
  europeanBoard.style.display = "block";
  hideAndShowShaker();
});

//Array of possible jumps given the clicked circle's position.
//This is a global variable that is accessed by the three different boards.
let jumpArray = [];

let globalId = '';
let globalLegalJumpArray = [];

let waitingForSecondClick = false;

//first selection event handler that is used by all three boards
const firstSelectionEventHandler = (e) => {
  console.log(e.target.getAttribute('id'));
  let id = e.target.getAttribute('id');
  jumpArray = [];
  if (id[0] === 't') { //for triangle board
    triangleGetMatchesOnRow(id);
    triangleGetMatchesDifferentRows(id);
  } else if (id[1] === 'n') { //for English board
    englishGetHorizontalMatches(id);
    englishGetVerticalMatches(id);
  } else { //for European board
    europeanGetHorizontalMatches(id);
    europeanGetVerticalMatches(id);
  }
  calculateLegalJumps(jumpArray, id);
};

const secondSelectionEventHandler = (e) => {
  let id = e.target.getAttribute('id');
  if (globalLegalJumpArray.includes(id)) {
    console.log("LEGAL MOVE SELECTED! HOT DAMN!");
    document.getElementById(globalId).classList.remove('selected-circle');
    performJump(globalId, id);
    document.getElementById(globalId).classList.remove('selected-circle');
    removeSecondAndAddFirstEventHandler(id);
    } else {
    console.log("THAT MOVE AIN'T LEGAL, DAWG!");
    document.getElementById(globalId).classList.remove('selected-circle');
    removeSecondAndAddFirstEventHandler(id);
  }
}

const removeFirstAndAddSecondEventHandler = (id) => {
  waitingForSecondClick = true;
  if (id[0] === 't') { //for triangle board
    document.querySelectorAll('.triangle').forEach(item => {
      item.removeEventListener('click', firstSelectionEventHandler);
      item.addEventListener('click', secondSelectionEventHandler);
    });
  } else if (id[1] === 'n') { //for English board
    document.querySelectorAll('.english').forEach(item => {
      item.removeEventListener('click', firstSelectionEventHandler);
      item.addEventListener('click', secondSelectionEventHandler);
    });
  } else { //for European board
    document.querySelectorAll('.european').forEach(item => {
      item.removeEventListener('click', firstSelectionEventHandler);
      item.addEventListener('click', secondSelectionEventHandler);
    });
  }
};

const removeSecondAndAddFirstEventHandler = (id) => {
  waitingForSecondClick = false;
  if (id[0] === 't') { //for triangle board
    document.querySelectorAll('.triangle').forEach(item => {
      item.removeEventListener('click', secondSelectionEventHandler);
      item.addEventListener('click', firstSelectionEventHandler);
    });
  } else if (id[1] === 'n') { //for English board
    document.querySelectorAll('.english').forEach(item => {
      item.removeEventListener('click', secondSelectionEventHandler);
      item.addEventListener('click', firstSelectionEventHandler);
    });
  } else { //for European board
    document.querySelectorAll('.european').forEach(item => {
      item.removeEventListener('click', secondSelectionEventHandler);
      item.addEventListener('click', firstSelectionEventHandler);
    });
  }
};

//Function for calculating the legal jumps given the array of possible jumps.
//This is a global function that is accessed by the three different boards.
const calculateLegalJumps = (jumpArray, id) => {
  let legalJumpArray = [];
  for (let i=0; i<jumpArray.length; i++) {
    let el = document.getElementById(jumpArray[i]);
    let textContent = el.textContent;
    let charCode = textContent.charCodeAt(0);
    if (charCode === 9675) { //charCode for white, "empty" circles
      legalJumpArray.push(jumpArray[i]);
    }
  }
  console.log(`Legal jumps: ${legalJumpArray}`);

  if (globalId !== '') {
    document.getElementById(globalId).classList.remove('selected-circle');
  }

  document.getElementById(id).classList.add('selected-circle');
  globalId = id; // set the id of first circle as a global variable

  if (legalJumpArray.length > 0) {
    globalLegalJumpArray = legalJumpArray;
  }

  removeFirstAndAddSecondEventHandler(id);
};

const checkIfWaitingForSecondClick = () => {
  if (waitingForSecondClick === true) { // this means that the secondSelectionEventHandler is active
    document.getElementById(globalId).classList.remove('selected-circle');
    if (selectedBoard === 'triangle') {
      document.querySelectorAll('.triangle').forEach(item => {
        item.removeEventListener('click', secondSelectionEventHandler);
        item.addEventListener('click', firstSelectionEventHandler);
      });
    } else if (selectedBoard === 'english') {
      document.querySelectorAll('.english').forEach(item => {
        item.removeEventListener('click', secondSelectionEventHandler);
        item.addEventListener('click', firstSelectionEventHandler);
      });
    } else if (selectedBoard === 'european') {
      document.querySelectorAll('.european').forEach(item => {
        item.removeEventListener('click', secondSelectionEventHandler);
        item.addEventListener('click', firstSelectionEventHandler);
      });
    }
  }
};

//make shaker icon appear on page or be hidden
const hideAndShowShaker = () => {
  if (selectedBoard === 'triangle') { //all of this logic is for shakeBoard()
    gameStartedTriangle === true ? document.getElementById('shaker-img').style.opacity = "0.4" :
    document.getElementById('shaker-img').style.opacity = "1";
  } else if (selectedBoard === 'english') {
    gameStartedEnglish === true ? document.getElementById('shaker-img').style.opacity = "0.4" :
    document.getElementById('shaker-img').style.opacity = "1";
  } else if (selectedBoard === 'european') {
    gameStartedEuropean === true ? document.getElementById('shaker-img').style.opacity = "0.4" :
    document.getElementById('shaker-img').style.opacity = "1";
  }
};
