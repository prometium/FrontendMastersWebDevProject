let runningTotal = 0;
let buffer = '0';
let previousOperator = null;
const screen = document.querySelector('.calc-screen');

function handleValue(value) {
  if (isNaN(+value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleSymbol(value) {
  switch (value) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if (previousOperator === null) return;

      flushOperation(+buffer);
      previousOperator = null;
      buffer = String(runningTotal);
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
  }
}

function handleMath(value) {
  const intBuffer = +buffer;

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = '0';
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case '+':
      runningTotal += intBuffer;
      break;
    case '-':
      runningTotal -= intBuffer;
      break;
    case '×':
      runningTotal *= intBuffer;
      break;
    case '÷':
      runningTotal /= intBuffer;
      break;
    default:
  }
}

function handleNumber(value) {
  if (buffer === '0') {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
}

function rerender() {
  screen.textContent = buffer;
}

document
  .querySelector('.calc-buttons')
  .addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName !== 'BUTTON') return;
    handleValue(target.textContent);
  });
