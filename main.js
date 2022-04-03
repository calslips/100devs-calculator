class Calculator {
  constructor() {
    const display = document.querySelector('span');
    const buttons = Array.from(document.querySelectorAll('button'));

    let firstOperand = '';
    let operator = '';
    let secondOperand = '';
    const operations = {
      '/': (a, b) => a / b,
      'x': (a, b) => a * b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    }

    this.getOperand = (e) => {
      if (!operator) {
        if (e.target.innerText === '-' && firstOperand && !secondOperand) {
          // ignore minus sign while first operand is in process of being made, but allow it to go through if it's the first character
        } else {
          firstOperand += e.target.innerText
          display.innerText = firstOperand
        }
      } else {
        if (e.target.innerText === '-' && secondOperand) {
          // ignore minus sign while in process of creating second opperand unless its the first char
        } else {
          secondOperand += e.target.innerText
          display.innerText = `${firstOperand} ${operator} ${secondOperand}`
        }
      }
    }
    this.getOperator = (e) => {
      if (firstOperand === '-') {
        // skip if minus was meant to be a negative value and NOT subtraction
      } else if (!operator && firstOperand) {
        operator = e.target.innerText;
        display.innerText = `${firstOperand} ${operator}`
      }
    }
    this.getResult = () => {
      if (firstOperand && operator && secondOperand) {
        let result = operations[operator](+firstOperand, +secondOperand);
        display.innerText = result;
        firstOperand = result;
        operator = '';
        secondOperand = '';
      }
    }
    this.reset = () => {
      firstOperand = '';
      operator = '';
      secondOperand = '';
      display.innerText = '';
    }

    display.addEventListener('click', this.reset);
    buttons.forEach(btn => btn.addEventListener('click', this.collectInput))
    buttons.filter(btn => btn.classList.value.includes('num')).forEach(btn => btn.addEventListener('click', this.getOperand))
    buttons.filter(btn => btn.classList.value.includes('op')).forEach(btn => btn.addEventListener('click', this.getOperator))
    document.querySelector('.equal').addEventListener('click', this.getResult)
  }
}

const calc = new Calculator();
