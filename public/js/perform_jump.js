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
    if (selectedBoard === 'triangle' && gameStartedTriangle === false) { //all of this logic is for shakeBoard()
      gameStartedTriangle = true;
    } else if (selectedBoard === 'english' && gameStartedEnglish === false) {
      gameStartedEnglish = true;
    } else if (selectedBoard === 'european' && gameStartedEuropean === false) {
      gameStartedEuropean = true;
    }
    hideAndShowShaker();
  }
};
