const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $gameTime = document.querySelector('#game-time');


let colors = ['#090979','#0fe2a7','#3ee20f','#b20fe2','#e20f2f','#e2d10f','#0fe2ca',
'#020024','#f2f2f2','#f00ef2','#f2800e','#f20e63','#e20f93'];
let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}


function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', 'true');
  isGameStarted = true;
  $game.style.backgroundColor = '#fff';
  hide($start);

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent);
    
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute('disabled');
  show($start);
  $game.innerHTML = '';
  $game.style.backgroundColor = '#ccc';
  hide($timeHeader);
  show($resultHeader);
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return; 
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = '';
  let box = document.createElement('div');
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  let RandomColorIndex = getRandom(0, colors.length);

  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = colors[RandomColorIndex];
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $game.insertAdjacentElement('afterbegin', box);

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}