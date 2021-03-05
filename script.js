const numberButtons = document.querySelectorAll("#number");
const operatorButtons = document.querySelectorAll("#operator");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalsButton = document.querySelector(".equals");
const pointButton = document.querySelector(".point");
const display = document.querySelector("#display");

let fisrtOperand = "";
let secondOperand = "";
let currentOperation = null;
let shoudResetScreen = false;

window.addEventListener("keydown", setInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button) => 
    button.addEventListener("click", () => appendNumber(button.textContent))
    );

operatorButtons.forEach((button) => 
    button.addEventListener("click", () => setOperation(button.textContent))
    );

function appendNumber(number) {
    if (display.textContent === "0" || shoudResetScreen) resetScreen();
    display.textContent += number;
}

function resetScreen() {
    display.textContent = "";
    shoudResetScreen = false;
}

function clear() {
    display.textContent = "0";
    fisrtOperand = "";
    secondOperand = "";
    currentOperation = null;
}

function appendPoint() {
    if (shoudResetScreen) resetScreen();
    if (display.textContent === "") display.textContent = "0";
    if (display.textContent.includes(".")) return;
    display.textContent += ".";
}

function deleteNumber() {
    display.textContent = display.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    fisrtOperand = display.textContent;
    currentOperation = operator;
    shoudResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shoudResetScreen) return;
    if (currentOperation === "/" && display.textContent === "0") {
        alert("não é possivel dividir por 0!");
        clear();
        return;
    }
    secondOperand = display.textContent;
    display.textContent = roundResult(
        operate(currentOperation, fisrtOperand, secondOperand)
        );
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function setInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendPoint(e.key);
    if (e.key === "=" || e.key === "Enter") evaluate(e.key);
    if (e.key === "Backspace") deleteNumber(e.key);
    if (e.key === "Espace") clear(e.key);
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "/";
  if (keyboardOperator === "*") return "*";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}