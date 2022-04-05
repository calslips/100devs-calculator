class Calculator {
  constructor() {
    const display = document.querySelector('span');
    const buttons = Array.from(document.querySelectorAll('button'));

    display.innerText = '0';
    let target = ''
    let firstOperand = '';
    let operator = '';
    let secondOperand = '';
    const operations = {
      '/': (a, b) => a / b,
      'x': (a, b) => a * b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    }

    this.handleNumPress = (key) => {
      const approvedNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'];
      return approvedNums.includes(key) ? key : '';
    }

    this.handleOpPress = (key) => {
      const approvedOps = ['/', 'x', '+', '-'];
      return approvedOps.includes(key) ? key : '';
    }

    this.determineInputType = (e, numOrOp) => {
      if (e.type === 'click') {
        target = e.target.innerText;
      } else if (e.type === 'keydown') {
        if (numOrOp === 'num') {
          target = this.handleNumPress(e.key)
        } else if (numOrOp === 'op') {
          target = this.handleOpPress(e.key);
        }
      }
    }

    this.getOperand = (e) => {
      this.determineInputType(e, 'num');
// PROBLEM HERE? switching from clicks to keypress in the middle of an operation, target is defined so it doubles up on something....?
// but when only clicking OR only pressing keys, no issue
      if (target) {
        if (!operator) {
          if (target === '-' && firstOperand && !secondOperand) {
            // ignore minus sign while first operand is in process of being made, but allow it to go through if it's the first character
          } else {
            firstOperand += target
            display.innerText = firstOperand
          }
        } else {
          if (target === '-' && secondOperand) {
            // ignore minus sign while in process of creating second opperand unless its the first char
          } else {
            secondOperand += target
            display.innerText = `${firstOperand} ${operator} ${secondOperand}`
          }
        }
      }
    }
    this.getOperator = (e) => {
      this.determineInputType(e, 'op');

      if (firstOperand === '-') {
        // skip if minus was meant to be a negative value and NOT subtraction
      } else if (!operator && firstOperand) {
        operator = target;
        display.innerText = `${firstOperand} ${operator}`
      }
    }
    this.getResult = (e) => {
      if (e.type === 'click' || e.key === 'Enter') {
        if (firstOperand && operator && secondOperand) {
          let result = operations[operator](+firstOperand, +secondOperand);
          display.innerText = result;
          firstOperand = result;
          operator = '';
          secondOperand = '';
        }
      }
    }
    this.reset = (e) => {
      if (e.type === 'click' || e.key === 'Backspace') {
        firstOperand = '';
        operator = '';
        secondOperand = '';
        display.innerText = '0';
      }
    }

    // click event listeners
    display.addEventListener('click', this.reset);
    buttons.forEach(btn => btn.addEventListener('click', this.collectInput))
    buttons.filter(btn => btn.classList.value.includes('num')).forEach(btn => btn.addEventListener('click', this.getOperand))
    buttons.filter(btn => btn.classList.value.includes('op')).forEach(btn => btn.addEventListener('click', this.getOperator))
    document.querySelector('.equal').addEventListener('click', this.getResult)

    // typed event listeners
    document.addEventListener('keydown', this.getOperand);
    document.addEventListener('keydown', this.getOperator);
    document.addEventListener('keydown', this.getResult);
    document.addEventListener('keydown', this.reset);
  }
}

const calc = new Calculator();
