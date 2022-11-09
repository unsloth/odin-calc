/*
need to have function like this:
function operate() {
    let a = first.input;
    let b = second.input;
    let operator = input.operator;

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
*/

let expression = {};

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers button");
numbers.forEach(btn => btn.addEventListener('click', inputNumber));

function inputNumber(e) {
    if (display.textContent === "0") {
        display.textContent = `${this.textContent}`
    }
    else {
        display.textContent = display.textContent.concat(`${this.textContent}`);
        checkDecimal();
    }
}

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
        expression.operator = this.textContent;

        exprDisplay.textContent = display.textContent.concat(`${this.textContent}`)
        display.textContent = 0;
    }
    // else if operand2 exists, perform 'operate' function and place result in operand1
    // and place operator in operator and update display.
}

