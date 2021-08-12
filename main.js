let startScreen = document.querySelector('.control-buttons');

document.querySelector('.control-buttons span').onclick = function () {
  let yourName = prompt('What is your name');
  console.log(yourName);
  if (yourName == null || yourName == '') {
    document.querySelector('.name span').innerHTML = 'Unknown';
  } else {
    document.querySelector('.name span').innerHTML = yourName;
  }

  document.querySelector('.control-buttons').remove();
};

let duration = 1000;
let noOfCards = 20;

let blockContainer = document.querySelector('.game');

let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

// add order property to css
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener('click', function () {
    flipBlock(block);
  });
});

// flip block function

function flipBlock(blockToBeFlopped) {
  blockToBeFlopped.classList.add('is-flipped');
  // collect flipped blocks

  let allFlippedBlocks = blocks.filter((b) =>
    b.classList.contains('is-flipped')
  );

  if (allFlippedBlocks.length === 2) {
    // stop clicking
    stopClicking();
    // check matches
    check(allFlippedBlocks[0], allFlippedBlocks[1]);

    // check end game
    checkGameEnd();
  }
}

// check end game function

function checkGameEnd() {
  let allFlippedBlocks = blocks.filter((b) =>
    b.classList.contains('has-matched')
  );
  if (allFlippedBlocks.length === noOfCards) {
    setTimeout(() => {
      let splash = document.querySelector('.splash');
      splash.append(startScreen);
      blocks.forEach((block) => {
        block.classList.remove('has-matched');
      });
    }, duration);
  }
}
// stop clicking function
function stopClicking() {
  blockContainer.classList.add('no-clicking');
  // restore clicking after the duration
  setTimeout(() => {
    blockContainer.classList.remove('no-clicking');
  }, duration);
}

// check matched blocks

function check(firstBlock, secondBlock) {
  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    firstBlock.classList.add('has-matched');
    secondBlock.classList.add('has-matched');
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
    }, duration);
  }
}

// shuffle array function
function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
