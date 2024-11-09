// Below is the ADD numbers function

function addNum(a, b) {
    return a + b;
}

// Below is the Subtract numbers function

function subNum(a, b) {
    return a - b;
}

// Below is the Multiply numbers function

function multiNum(a, b) {
    return a * b;
}

// Below is the Divide numbers function

function divideNum(a, b) {
    if (b === 0) return "Error: Division by zero";
    return a / b;
}

// Display area and the number button fuction part.

const display = document.getElementById("result-display");
const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (justCompletedOperation) {
            display.textContent = button.textContent;
            justCompletedOperation = false;
        } else if (display.textContent === '0') {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
    });
});

// Change Sign button functionality
const changeSignButton = document.getElementById('change-sign');
changeSignButton.addEventListener('click', () => {
    if (display.textContent !== '0') {
        // Toggle the sign
        if (display.textContent.startsWith('-')) {
            display.textContent = display.textContent.substring(1); // Remove the leading '-'
        } else {
            display.textContent = '-' + display.textContent; // Add a leading '-'
        }
    }
});

// modify your operator buttons to store the first number and clear the display for the second number.

let firstNumber = '';
let currentOperator = null;

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber && currentOperator && !justCompletedOperation) {
            const secondNumber = display.textContent;
            const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            display.textContent = result;
            firstNumber = result.toString();
        } else {
            firstNumber = display.textContent;
        }
        currentOperator = button.textContent;
        justCompletedOperation = true;
    });
});

// Equal button functionality.

let justCompletedOperation = false;

const equalsButton = document.getElementById("equals");

equalsButton.addEventListener("click", () => {
    if (firstNumber && currentOperator) {
        const secondNumber = display.textContent;
        const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        display.textContent = result;
        firstNumber = result.toString();
        currentOperator = null;
        justCompletedOperation = true;
    }
});

// Clear button functionality.

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    firstNumber = '';
    currentOperator = null;
    justCompletedOperation = false;
});

// Operate function for taking the three parameters: the operator and two numbers.

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return addNum(a, b);
        case '-':
            return subNum(a, b);
        case '*':
            return multiNum(a, b);
        case '/':
            return divideNum(a, b);
        default:
            return "Error: Invalid operator";
    }
}

// Decimal button functionality.
const decimalButton = document.getElementById("decimal-button");

decimalButton.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
});


// Backspace button functionality.
const backspaceButton = document.getElementById('backspace');

backspaceButton.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') {
        display.textContent = '0';
    }
});

// Keyboard support.
window.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        numberButtons.forEach(button => {
            if (button.textContent === key) {
                button.click();
            }
        });
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '=') {
        operatorButtons.forEach(button => {
            if (button.textContent === key) {
                button.click();
            }
        });
    } else if (key === 'c') {
        clearButton.click();
    } else if (key === 'Backspace') {
        backspaceButton.click();
    } else if (key === '.') {
        if (!display.textContent.includes('.')) {
            decimalButton.click();
        }
    } else if (key === 'Enter') {
        equalsButton.click();
    }
});