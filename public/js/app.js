const triangleButton = document.getElementById('triangle-selector');
const englishButton = document.getElementById('english-selector');
const europeanButton = document.getElementById('european-selector');

const triangleBoard = document.getElementById('triangle-container');
const englishBoard = document.getElementById('english-container');
const europeanBoard = document.getElementById('european-container');

triangleButton.addEventListener("click", () => {
  englishBoard.style.display = "none";
  europeanBoard.style.display = "none";
  triangleBoard.style.display = "block";
});

englishButton.addEventListener("click", () => {
  triangleBoard.style.display = "none";
  europeanBoard.style.display = "none";
  englishBoard.style.display = "block";
});

europeanButton.addEventListener("click", () => {
  triangleBoard.style.display = "none";
  englishBoard.style.display = "none";
  europeanBoard.style.display = "block";
});

//Array of possible jumps given the clicked circle's position.
//This is a global variable that is accessed by the three different boards.
let jumpArray = [];

let globalId = '';
let globalLegalJumpArray = [];

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
}

const performJump = (id1, id2) => {

  let jumpedId = '';

  //set the first part of the jumpedId
  if (id1[0] === 't') { //for triangle board
    jumpedId += `t_`;
  } else if (id1[1] === 'n') { //for English board
    jumpedId += `en_`;
  } else { //for European board
    jumpedId += `eu_`;
  }

  if (id1[id1.length - 3] === id2[id2.length - 3]) { // check if ids are on same row
    +id1[id1.length - 1] > +id2[id2.length - 1] ? jumpedId += `${id1[id1.length - 3]}_${+id1[id1.length - 1] - 1}` :
    jumpedId += `${id1[id1.length - 3]}_${+id1[id1.length - 1] + 1}`;
  } else if (id1[id1.length - 1] === id2[id2.length - 1]) { //check if ids have the same column number
    +id1[id1.length - 3] > +id2[id2.length - 3] ? jumpedId += `${+id1[id1.length - 3] - 1}_${id1[id1.length - 1]}` :
    jumpedId += `${+id1[id1.length - 3] + 1}_${id1[id1.length - 1]}`;
  } else if (id1[id1.length - 5] === 't') { //check if first id (and therefore both) is on triangle board
    if (+id1[id1.length - 3] > +id2[id2.length - 3]) {
      jumpedId += `${+id1[id1.length - 3] - 1}_${+id1[id1.length - 1] - 1}`;
    } else {
      jumpedId += `${+id1[id1.length - 3] + 1}_${+id1[id1.length - 1] + 1}`;
    }
  } else if (id1[id1.length - 5] === 'n') { //check if first id (and therefore both) is on English board
    if (+id1[id1.length - 3] === 4 && +id1[id1.length - 3] > +id2[id2.length - 3]) {
      jumpedId += `${+id1[id1.length - 3] - 1}_${id1[id1.length - 1]}`;
    } else if (+id1[id1.length - 3] === 4 && +id1[id1.length - 3] < +id2[id2.length - 3]) {
      jumpedId += `${+id1[id1.length - 3] + 1}_${id1[id1.length - 1]}`;
    } else if (+id1[id1.length - 3] === 7) {
      jumpedId += `${+id1[id1.length - 3] - 1}_${id1[id1.length - 1]}`;
    } else if (+id1[id1.length - 3] === 1) {
      jumpedId += `${+id1[id1.length - 3] + 1}_${id1[id1.length - 1]}`;
    } else if (+id1[id1.length - 3] < 5 && +id1[id1.length - 3] > +id2[id2.length - 3]) {
      jumpedId += `${+id1[id1.length - 3] - 1}_${+id1[id1.length - 1] - 2}`;
    } else if (+id1[id1.length - 3] > 3 && +id1[id1.length - 3] < +id2[id2.length - 3]) {
      jumpedId += `${+id1[id1.length - 3] + 1}_${+id1[id1.length - 1] - 2}`;
    } else if (+id1[id1.length - 3] < 3) {
      jumpedId += `${+id1[id1.length - 3] + 1}_${+id1[id1.length - 1] + 2}`;
    } else if (+id1[id1.length - 3] > 5) {
      jumpedId += `${+id1[id1.length - 3] - 1}_${+id1[id1.length - 1] + 2}`;
    }
  } else if (id1[id1.length - 5] === 'u') { //check if first id (and therefore both) is on European board
    if (+id1[id1.length - 3] === 1 || +id1[id1.length - 3] === 2) {
      jumpedId += `${+id1[id1.length - 3] + 1}_${+id1[id1.length - 1] + 1}`;
    } else if (+id1[id1.length - 3] === 7 || +id1[id1.length - 3] === 6) {
      jumpedId += `${+id1[id1.length - 3] - 1}_${+id1[id1.length - 1] + 1}`;
    } else if (+id1[id1.length - 3] === 3) {
      jumpedId += `${+id1[id1.length - 3] - 1}_${+id1[id1.length - 1] - 1}`;
    } else if (+id1[id1.length - 3] === 5) {
      jumpedId += `${+id1[id1.length - 3] + 1}_${+id1[id1.length - 1] - 1}`;
    } else if (+id1[id1.length - 3] === 4 && +id2[id2.length - 3] < 4) {
      jumpedId += `${+id1[id1.length - 3] - 1}_${id1[id1.length - 1]}`;
    } else if (+id1[id1.length - 3] === 4 && +id2[id2.length - 3] > 4) {
      jumpedId += `${+id1[id1.length - 3] + 1}_${id1[id1.length - 1]}`;
    }
  }

  //BUG FIX: This "if" statement checks to see if the jumpedId is already a white
  //circle. The "legalJumpArray" only includes destination circles that are white;
  //it does not check to see if the jumped over circle is also white (which shouldn't
  //be allowed).
  //ALSO: White circles were able to be selected and then used to jump over black
  //circles -- this is also fixed with this "if" statement.
  if (document.getElementById(jumpedId).textContent.charCodeAt(0) !== 9675 &&
    document.getElementById(id1).textContent.charCodeAt(0) !== 9675) {
    document.getElementById(jumpedId).innerHTML = '&#9675;'; //white
    document.getElementById(id1).innerHTML = '&#9675;'; //white
    document.getElementById(id2).innerHTML = '&#9679;'; //black
  }


}
