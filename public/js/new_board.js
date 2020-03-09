const newBoard = () => {

  checkIfWaitingForSecondClick();

  if (selectedBoard === 'triangle') {
    gameStartedTriangle = false; // for shakeBoard()
    document.querySelectorAll('.triangle').forEach(item => {
      if (item.getAttribute('id') === 't_1_1') {
        item.innerHTML = "&#9675;";
      } else {
        item.innerHTML = "&#9679;";
      }
    });
  } else if (selectedBoard === 'english') {
    gameStartedEnglish = false; // for shakeBoard()
    document.querySelectorAll('.english').forEach(item => {
      if (item.getAttribute('id') === 'en_4_4') {
        item.innerHTML = "&#9675;";
      } else {
        item.innerHTML = "&#9679;";
      }
    });
  } else if (selectedBoard === 'european') {
    gameStartedEuropean = false; // for shakeBoard()
    document.querySelectorAll('.european').forEach(item => {
      if (item.getAttribute('id') === 'eu_4_4') {
        item.innerHTML = "&#9675;";
      } else {
        item.innerHTML = "&#9679;";
      }
    });
  }

  document.getElementById('shaker-img').style.opacity = "1";
};

const newBoardButton = document.getElementById('reload-img');
newBoardButton.addEventListener('click', newBoard);
