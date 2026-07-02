let display = document.getElementById('display');
let shouldResetDisplay = false;

function appendNumber(num) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = num;
        shouldResetDisplay = false;
    } else {
        display.textContent += num;
    }
}

function appendOperator(operator) {
    if (shouldResetDisplay) {
        shouldResetDisplay = false;
    }
    let current = display.textContent;
    let lastChar = current.slice(-1);

    // avoid stacking two operators in a row
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.textContent = current.slice(0, -1) + operator;
    } else {
        display.textContent += operator;
    }
}

function clearDisplay() {
    display.textContent = '0';
    shouldResetDisplay = false;
}

function calculate() {
    try {
        // only allow numbers, operators, decimal points and spaces
        let expression = display.textContent;
        if (!/^[0-9+\-*/.\s]+$/.test(expression)) {
            throw new Error('Invalid expression');
        }
        let result = Function('"use strict"; return (' + expression + ')')();

        if (result === Infinity || result === -Infinity) {
            display.textContent = 'Error';
        } else {
            // round to avoid floating point issues like 0.1 + 0.2
            display.textContent = Math.round(result * 100000000) / 100000000;
        }
        shouldResetDisplay = true;
    } catch (error) {
        display.textContent = 'Error';
        shouldResetDisplay = true;
    }
}