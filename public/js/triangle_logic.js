document.querySelectorAll('.triangle').forEach(item => {
  item.addEventListener('click', firstSelectionEventHandler);
});

const triangleGetMatchesOnRow = (id) => {
  if (+id[2] < 3) {
    console.log("Ain't no other matches on this row!");
    return
  }

  let jumpForward;
  let jumpBack;

  if (+id[4] + 2 <= +id[2]) {
    jumpForward = `t_${id[2]}_${+id[4] + 2}`;
    console.log(`Possible jump forward on same row: ${jumpForward}`);
    jumpArray.push(jumpForward);
  } if (+id[4] >= 3) {
    jumpBack = `t_${id[2]}_${+id[4] - 2}`;
    console.log(`Possible jump back on same row: ${jumpBack}`);
    jumpArray.push(jumpBack);
  }
};


const triangleGetMatchesDifferentRows = (id) => {
  let jumpUpRight;
  let jumpUpLeft;
  let jumpDownRight;
  let jumpDownLeft;

  //calculate jumpUpRight
  if (+id[2] >= 3) { //figure out if starting row is big enough
    if (+id[4] <= +id[2] - 2) { //figure out if circle number is small enough
      jumpUpRight = `t_${+id[2] - 2}_${id[4]}`;
      console.log(`Possible jump up right: ${jumpUpRight}`);
      jumpArray.push(jumpUpRight);
    }
  }

  //calculate jumpUpLeft
  if (+id[2] >= 3) { //figure out if starting row is big enough
    if (+id[4] >= 3) { //figure out if circle number is small enough
      jumpUpLeft = `t_${+id[2] - 2}_${+id[4] - 2}`;
      console.log(`Possible jump up left: ${jumpUpLeft}`);
      jumpArray.push(jumpUpLeft);
    }
  }

  //calculate jumpDownLeft
  if (+id[2] <= 3) { //figure out if starting row is small enough
    jumpDownRight = `t_${+id[2] + 2}_${+id[4] + 2}`;
    console.log(`Possible jump down right: ${jumpDownRight}`);
    jumpArray.push(jumpDownRight);
  }

  //calculate jumpDownLeft
  if (+id[2] <= 3) { //figure out if starting row is small enough
    jumpDownLeft = `t_${+id[2] + 2}_${+id[4]}`;
    console.log(`Possible jump down left: ${jumpDownLeft}`);
    jumpArray.push(jumpDownLeft);
  }

};
