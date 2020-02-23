document.querySelectorAll('.european').forEach(item => {
  item.addEventListener('click', firstSelectionEventHandler);
});

const europeanGetHorizontalMatches = (id) => {
  let jumpForward;
  let jumpBack;

  //calculate jumps for rows of 3
  if (+id[3] === 1 || +id[3] === 7) {
    if (+id[5] !== 2) {
      if (+id[5] === 1) {
        jumpForward = `eu_${id[3]}_3`;
        console.log(`Possible jump forward is: ${jumpForward}`);
        jumpArray.push(jumpForward);
      } else {
        jumpBack = `eu_${id[3]}_1`;
        console.log(`Possible jump back is: ${jumpBack}`);
        jumpArray.push(jumpBack);
      }
    }
  };

  //calculate jumps for rows of 5
  if (+id[3] === 2 || +id[3] === 6) {
    if (+id[5] < 3) {
      jumpForward = `eu_${id[3]}_${+id[5] + 2}`;
      console.log(`Possible jump forward is: ${jumpForward}`);
      jumpArray.push(jumpForward);
    } else if (+id[5] > 3) {
      jumpBack = `eu_${id[3]}_${+id[5] - 2}`;
      console.log(`Possible jump back is: ${jumpBack}`);
      jumpArray.push(jumpBack);
    } else {
      jumpForward = `eu_${id[3]}_${+id[5] + 2}`;
      console.log(`Possible jump forward is: ${jumpForward}`);
      jumpArray.push(jumpForward);
      jumpBack = `eu_${id[3]}_${+id[5] - 2}`;
      console.log(`Possible jump back is: ${jumpBack}`);
      jumpArray.push(jumpBack);
    }
  };

  //calculate jumps for rows of 7
  if (+id[3] > 2 && +id[3] < 6) {
    if (+id[5] < 3) {
      jumpForward = `eu_${id[3]}_${+id[5] + 2}`;
      console.log(`Possible jump forward is: ${jumpForward}`);
      jumpArray.push(jumpForward);
    } else if (+id[5] > 5) {
      jumpBack = `eu_${id[3]}_${+id[5] - 2}`;
      console.log(`Possible jump back is: ${jumpBack}`);
      jumpArray.push(jumpBack);
    } else {
      jumpForward = `eu_${id[3]}_${+id[5] + 2}`;
      console.log(`Possible jump forward is: ${jumpForward}`);
      jumpArray.push(jumpForward);
      jumpBack = `eu_${id[3]}_${+id[5] - 2}`;
      console.log(`Possible jump back is: ${jumpBack}`);
      jumpArray.push(jumpBack);
    }
  }
};

const europeanGetVerticalMatches = (id) => {
  let jumpUp;
  let jumpDown;

  //calculate jumps for rows of 3
  if (+id[3] === 1) {
    let jumpDown = `eu_${+id[3] + 2}_${+id[5] + 2}`;
    console.log(`Possible jump down is: ${jumpDown}`);
    jumpArray.push(jumpDown);
  } else if (+id[3] === 7) {
    let jumpUp = `eu_${+id[3] - 2}_${+id[5] + 2}`;
    console.log(`Possible jump up is: ${jumpUp}`);
    jumpArray.push(jumpUp);
  };

  //calculate jumps for rows of 5
  if (+id[3] === 2) {
    let jumpDown = `eu_${+id[3] + 2}_${+id[5] + 1}`;
    console.log(`Possible jump down is: ${jumpDown}`);
    jumpArray.push(jumpDown);
  } else if (+id[3] === 6) {
    let jumpUp = `eu_${+id[3] - 2}_${+id[5] + 1}`;
    console.log(`Possible jump up is: ${jumpUp}`);
    jumpArray.push(jumpUp);
  };

  //calculate jumps for rows of 7
  if (+id[3] > 2 && +id[3] < 6) {
    if ((+id[5] === 1 || +id[5] === 7) && +id[3] !== 4) {
      if (+id[3] === 3) {
        let jumpDown = `eu_${+id[3] + 2}_${+id[5]}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
      } else {
        let jumpUp = `eu_${+id[3] - 2}_${+id[5]}`;
        console.log(`Possible jump up is: ${jumpUp}`);
        jumpArray.push(jumpUp);
      }
    } else if (+id[5] === 2 || +id[5] === 6) {
      if (+id[3] === 3) {
        let jumpDown = `eu_${+id[3] + 2}_${+id[5]}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
      } else if (+id[3] === 5) {
        let jumpUp = `eu_${+id[3] - 2}_${+id[5]}`;
        console.log(`Possible jump up is: ${jumpUp}`);
        jumpArray.push(jumpUp);
      } else {
        let jumpDown = `eu_${+id[3] + 2}_${+id[5] - 1}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
        let jumpUp = `eu_${+id[3] - 2}_${+id[5] - 1}`;
        console.log(`Possible jump up is: ${jumpUp}`);
        jumpArray.push(jumpUp);
      }
    } else if (+id[5] > 2 && +id[5] < 6) {
      if (+id[3] === 3) {
        let jumpDown = `eu_${+id[3] + 2}_${+id[5]}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
        let jumpUp = `eu_${+id[3] - 2}_${+id[5] - 2}`;
        console.log(`Possible jump up is: ${jumpUp}`);
        jumpArray.push(jumpUp);
      } else if (+id[3] === 4) {
        let jumpDown = `eu_${+id[3] + 2}_${+id[5] - 1}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
        let jumpUp = `eu_${+id[3] - 2}_${+id[5] - 1}`;
        console.log(`Possible jump up is: ${jumpUp}`);
        jumpArray.push(jumpUp);
      } else if (+id[3] === 5) {
        let jumpDown = `eu_${+id[3] + 2}_${+id[5] - 2}`;
        console.log(`Possible jump down is: ${jumpDown}`);
        jumpArray.push(jumpDown);
        let jumpUp = `eu_${+id[3] - 2}_${+id[5]}`;
        console.log(`Possible jump up is: ${jumpUp}`);
        jumpArray.push(jumpUp);
      }
    }
  }
};
