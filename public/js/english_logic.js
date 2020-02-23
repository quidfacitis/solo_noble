document.querySelectorAll('.english').forEach(item => {
  item.addEventListener('click', firstSelectionEventHandler);
});

const englishGetHorizontalMatches = (id) => {
  let jumpForward;
  let jumpBack;

  //calculate jumps for rows of 3
  if (+id[3] < 3 || +id[3] > 5) {
    if (+id[5] !== 2) {
      if (+id[5] === 1) {
        jumpForward = `en_${id[3]}_${3}`;
        console.log(`Possible jump forward is: ${jumpForward}`);
        jumpArray.push(jumpForward);
      } else {
        jumpBack = `en_${id[3]}_${1}`;
        console.log(`Possible jump back is: ${jumpBack}`);
        jumpArray.push(jumpBack);
      }
    }
  }

  //calculate jumps for rows of 7
  if (+id[3] > 2 && +id[3] < 6) {
    if (+id[5] < 3) {
      jumpForward = `en_${id[3]}_${+id[5] + 2}`;
      console.log(`Possible jump forward is: ${jumpForward}`);
      jumpArray.push(jumpForward);
    } else if (+id[5] > 5) {
      jumpBack = `en_${id[3]}_${+id[5] - 2}`;
      console.log(`Possible jump back is: ${jumpBack}`);
      jumpArray.push(jumpBack);
    } else {
      jumpForward = `en_${id[3]}_${+id[5] + 2}`;
      console.log(`Possible jump forward is: ${jumpForward}`);
      jumpArray.push(jumpForward);
      jumpBack = `en_${id[3]}_${+id[5] - 2}`;
      console.log(`Possible jump back is: ${jumpBack}`);
      jumpArray.push(jumpBack);
    }
  }
};

const englishGetVerticalMatches = (id) => {
  let jumpUp;
  let jumpDown;

  //calculate jumps for rows of 3
  if (+id[3] < 3) {
    let jumpDown = `en_${+id[3] + 2}_${+id[5] + 2}`;
    console.log(`Possible jump down is: ${jumpDown}`);
    jumpArray.push(jumpDown);
  } else if (+id[3] > 5) {
    let jumpUp = `en_${+id[3] - 2}_${+id[5] + 2}`;
    console.log(`Possible jump up is: ${jumpUp}`);
    jumpArray.push(jumpUp);
  }

  //the first "if" - "else if" pair calculate jumps for rows of 7 that extend
  //beyond the range of the rows of 3 (i.e. < 3 && > 5). The final "else if" is for
  //the center circles of the center rows.
  if (+id[3] > 2 && +id[3] < 6) {
    if (+id[5] < 3 && +id[3] !== 4) {
      if (+id[3] === 3) {
        let jumpDown = `en_${+id[3] + 2}_${+id[5]}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
      } else {
      let jumpUp = `en_${+id[3] - 2}_${+id[5]}`;
      console.log(`Possible jump up is: ${jumpUp}`);
      jumpArray.push(jumpUp);
      }
    } else if (+id[5] > 5 && +id[3] !== 4) {
      if (+id[3] === 3) {
        let jumpDown = `en_${+id[3] + 2}_${+id[5]}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
      } else {
      let jumpUp = `en_${+id[3] - 2}_${+id[5]}`;
      console.log(`Possible jump up is: ${jumpUp}`);
      jumpArray.push(jumpUp);
      }
    } else if (+id[5] > 2 && +id[5] < 6) {
      if (+id[3] === 5) {
        jumpUp = `en_${+id[3] - 2}_${id[5]}`;
        console.log(`Possible jump up is: ${jumpUp}`);
        jumpArray.push(jumpUp);
      } else {
        jumpUp = `en_${+id[3] - 2}_${+id[5] - 2}`;
        console.log(`Possible jump up is: ${jumpUp}`)
        jumpArray.push(jumpUp);
      }

      if (+id[3] === 3) {
        jumpDown = `en_${+id[3] + 2}_${id[5]}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
      } else {
        jumpDown = `en_${+id[3] + 2}_${+id[5] - 2}`;
        console.log(`Possible jump down is: ${jumpDown}`)
        jumpArray.push(jumpDown);
      }
    }
  }
};
