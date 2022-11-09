// This object will hold and save the values for the expression to be 
// calculated. It's 3 properties should be operand1, operator, & operand2
let expression = {};

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers button");
numbers.forEach(btn => btn.addEventListener('click', inputNumber));

// Sets the rules for entering the number with the number buttons.
function inputNumber(e) {
    if (display.textContent === "0") {
        display.textContent = `${this.textContent}`
    }
    else {
        display.textContent = display.textContent.concat(`${this.textContent}`);
        checkDecimal();
    }
}

// Makes sure there can be at most 1 decimal per number and turns off the 
// button if there is one.
function checkDecimal() {
    const decimalButton = document.querySelector(".decimal");
    if (display.textContent.includes(".")) {
        decimalButton.removeEventListener("click", inputNumber);
    } else {
        decimalButton.addEventListener("click", inputNumber);
    }
}

const exprDisplay = document.querySelector(".expr-display");
const operators = document.querySelectorAll(".operators button");
operators.forEach(btn => btn.addEventListener("click", inputOperator));

function inputOperator(e) {
    if (!("operator" in expression)) {
        expression.operand1 = display.textContent;
        expression.operator = this.classList.value;

        exprDisplay.textContent = display.textContent.concat(`${this.textContent}`)
        display.textContent = 0;
    }
    // else if operand2 exists, perform 'operate' function and place result in operand1
    // and place operator in operator and update display.
}

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", checkExpression);

function checkExpression() {
    expression.operand2 = display.textContent;
    exprDisplay.textContent = exprDisplay.textContent.concat(`${display.textContent}=${operate()}`);
}

function operate() {
    let a = expression.operand1;
    let b = expression.operand2;
    let operator = expression.operator;

    switch (operator) {
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "*":
            return a * b;
            break;
        case "/":
            if (b != 0) {
                return a / b;
            } else {
                return "wtf are you doing"
            }
            break;
    }
}