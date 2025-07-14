// 百ます計算ゲーム ロジック
const SIZE = 10;
let leftNumbers = [];
let topNumbers = [];
let startTime = null;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame() {
  leftNumbers = shuffle([...Array(SIZE).keys()].map(x => x + 1));
  topNumbers = shuffle([...Array(SIZE).keys()].map(x => x + 1));
  startTime = Date.now();
  document.getElementById('result').textContent = '';
  renderTable();
}

function renderTable() {
  let html = '<table><tr><th></th>';
  for (let x = 0; x < SIZE; x++) {
    html += `<th class='header'>${topNumbers[x]}</th>`;
  }
  html += '</tr>';
  for (let y = 0; y < SIZE; y++) {
    html += `<tr><th class='header'>${leftNumbers[y]}</th>`;
    for (let x = 0; x < SIZE; x++) {
      html += `<td><input type='number' min='1' max='100' id='cell-${y}-${x}' autocomplete='off'></td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  document.getElementById('game').innerHTML = html;
}

function checkAnswers() {
  if (!startTime) return;
  let correct = 0;
  let total = SIZE * SIZE;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const input = document.getElementById(`cell-${y}-${x}`);
      const answer = leftNumbers[y] * topNumbers[x];
      if (parseInt(input.value) === answer) {
        input.style.background = '#c8f7c5';
        correct++;
      } else {
        input.style.background = '#f7c5c5';
      }
    }
  }
  const time = ((Date.now() - startTime) / 1000).toFixed(1);
  document.getElementById('result').textContent = `正解数: ${correct} / ${total}　経過時間: ${time}秒`;
}

// 初期表示
document.addEventListener('DOMContentLoaded', startGame);
