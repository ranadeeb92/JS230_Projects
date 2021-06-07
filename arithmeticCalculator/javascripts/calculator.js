function calculate(number1, number2, operator) {
  switch(operator) {
    case '+':
      return number1 + number2;
    case '*':
      return number1 * number2;
    case '/':
      return number1 / number2;
    case '-':
      return number1 - number2;
  }
} 

document.addEventListener("DOMContentLoaded", function() {
  let h1 = document.getElementById('result');
  let form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let inputs = form.querySelectorAll("input[type='number']");
    let firstNumber = Number(inputs[0].value);
    let secondNumber = Number(inputs[1].value);
    let operator = form.querySelector("#operator").value;
   
    let result = calculate(firstNumber, secondNumber, operator);
    h1.textContent = result;
  });
});