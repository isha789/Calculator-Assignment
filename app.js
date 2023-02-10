var display = document.getElementById("display");
var buttons = document.querySelectorAll("button");
var clearButton = document.getElementById("clear");
var addButton = document.getElementById("add");
var subtractButton = document.getElementById("subtract");
var multiplyButton = document.getElementById("multiply");
var divideButton = document.getElementById("divide");
var decimalButton = document.getElementById("decimal");
var equalsButton = document.getElementById("equals");

var num1 = null;
var num2 = null;
var operator = null;
var decimalAdded = false;

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var value = this.innerHTML;
    if (!isNaN(value) || value === ".") {
      if (operator === null) {
        if (value === ".") {
          num1 = (num1 === null) ? "0." : num1 + value;
          decimalAdded = true;
        } else {
          num1 = (num1 === null) ? value : num1 + value;
        }
        display.value = num1;
      } else {
        if (value === ".") {
          num2 = (num2 === null) ? "0." : num2 + value;
          decimalAdded = true;
        } else {
          num2 = (num2 === null) ? value : num2 + value;
        }
        display.value = num2;
      }
    } else if (value === "C") {
      display.value = "";
      num1 = null;
      num2 = null;
      operator = null;
      decimalAdded = false;
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
      operator = value;
      decimalAdded = false;
    } else if (value === "=") {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      switch (operator) {
        case "+":
          display.value = num1 + num2;
          break;
        case "-":
          display.value = num1 - num2;
          break;
        case "*":
          display.value = num1 * num2;
          break;
        case "/":
          display.value = num1 / num2;
          break;
      }
      num1 = parseFloat(display.value);
      num2 = null;
      operator = null;
      decimalAdded = false;
    }
  });
}