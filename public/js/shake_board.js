const triangleIdArray = [];
const englishIdArray = [];
const europeanIdArray = [];

if (triangleIdArray.length === 0) {
  document.querySelectorAll('.triangle').forEach(item => {
    triangleIdArray.push(item.getAttribute('id'));
  });
}

if (englishIdArray.length === 0) {
  document.querySelectorAll('.english').forEach(item => {
    englishIdArray.push(item.getAttribute('id'));
  });
}

if (europeanIdArray.length === 0) {
  document.querySelectorAll('.european').forEach(item => {
    europeanIdArray.push(item.getAttribute('id'));
  });
}

const getRandomId = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const shakeBoard = () => {
  console.log('shakeBoard clicked!');
  if (document.getElementById('shaker-img').style.opacity === "1") { // make sure the button isn't disabled
    console.log('opacity is 1 -- therefore, button is activated');
    checkIfWaitingForSecondClick();
    if (selectedBoard === 'triangle') {
      const randomTriangleId = getRandomId(triangleIdArray);
      document.querySelectorAll('.triangle').forEach(item => {
        if (item.getAttribute('id') === randomTriangleId) {
          item.innerHTML = "&#9675;";
        } else {
          item.innerHTML = "&#9679;";
        }
      });
    } else if (selectedBoard === 'english') {
      const randomEnglishId = getRandomId(englishIdArray);
      document.querySelectorAll('.english').forEach(item => {
        if (item.getAttribute('id') === randomEnglishId) {
          item.innerHTML = "&#9675;";
        } else {
          item.innerHTML = "&#9679;";
        }
      });
    } else if (selectedBoard === 'european') {
      const randomEuropeanId = getRandomId(europeanIdArray);
      document.querySelectorAll('.european').forEach(item => {
        if (item.getAttribute('id') === randomEuropeanId) {
          item.innerHTML = "&#9675;";
        } else {
          item.innerHTML = "&#9679;";
        }
      });
    }
  }
};

const shakeBoardButton = document.getElementById('shaker-img');
shakeBoardButton.addEventListener('click', shakeBoard);

//BUG FIX: The opacity for the shaker-img was appearing as an empty string
//when the page first loaded. This prevented the button from being detected as
//"active," which meant that the button wouldn't work immediately -- it was
//necessary to either click the in-game 'reload' button or switch to another
//board.
document.getElementById('shaker-img').onload = function() {
  document.getElementById('shaker-img').style.opacity = "1";
};
