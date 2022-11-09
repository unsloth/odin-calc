// This object will hold and save the values for the expression to be 
// calculated. It's 3 properties should be operand1, operator, & operand2
let expression = {};

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers button");
numbers.forEach(btn => btn.addEventListener('click', inputNumber));

// Sets the rules for entering the number with the number buttons.
// If there is no operand1 in expression, any number in the display is the result
// of the prev. expression and isn't necessary so should be replaced by the number.
// If the display shows 0, it should be replaced by the number. Otherwise, any 
// number should be appended as a digit.
function inputNumber(e) {
    if (!("operand1" in expression)) {
        display.textContent = `${this.textContent}`;
        // Value of operand1 doesn't actually matter since it will be replaced.
        // Main point is that it exists
        expression.operand1 = display.textContent;
    } else if (display.textContent === "0") {
        display.textContent = `${this.textContent}`;
    } else {
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

// If there is already an operator, first we solve the previous expression, 
// then we use the solution as the first operand of the new expression with the 
// new operator. Otherwise we just record the inputted number and operator to 
// start a new expression. Also, if we're continuing a previous expression, we 
// keep the old expression on the exprDisplay. Otherwise we print the new expression.
function inputOperator(e) {
    if ("operator" in expression) {
        checkExpression();
        expression.operand1 = display.textContent;
        expression.operator = this.classList.value;
    } else {
        expression.operand1 = display.textContent;
        expression.operator = this.classList.value;
        printExpression();
    }
    display.textContent = 0;
}

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", checkExpression);

// This checks if the expression is complete, and if it is it solves it and 
// resets the expression.
function checkExpression() {
    expression.operand2 = display.textContent;
    if (("operand1" in expression) && ("operand2" in expression) && ("operator" in expression)) {
        printExpression();
        display.textContent = operate();
        exprDisplay.textContent = exprDisplay.textContent.concat(`=${display.textContent}`);
        expression = {};
    }
}

function printExpression() {
    let exprString = ""
    for (key in expression) {
        exprString = exprString.concat(`${expression[key]}`);
    }
    exprDisplay.textContent = exprString;
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