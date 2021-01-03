/*
Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
o código, conforme vimos na aula anterior. Quebrar as responsabilidades
em funções, onde cada função faça somente uma única coisa, e faça bem feito.

- Remova as duplicações de código;
- agrupe os códigos que estão soltos em funções (declarações de variáveis,
listeners de eventos, etc);
- faça refactories para melhorar esse código, mas de forma que o mantenha com a
mesma funcionalidade.
*/
var $visor = document.querySelector('[data-js="visor"]');
var buttonsNumbers = document.querySelectorAll('[data-js="button-number"]');
var $buttonsOperations = document.querySelectorAll('[data-js="button-operation"]');
var $buttonCE = document.querySelector('[data-js="button-ce"]');
var $buttonEqual = document.querySelector('[data-js="button-equal"]');

var calcOperations = {
  "+": function (num1, num2) {
    return Number(num1) + Number(num2);
  },
  "-": function (num1, num2) {
    return Number(num1) - Number(num2);
  },
  x: function (num1, num2) {
    return Number(num1) * Number(num2);
  },
  "÷": function (num1, num2) {
    return Number(num1) / Number(num2);
  },
};

buttonsNumbers.forEach(function (number) {
  number.addEventListener("click", handleClickNumber, false);
});

$buttonsOperations.forEach(function(operator) {
  operator.addEventListener('click', handleClickOperation, false);
})

$buttonCE.addEventListener('click', handleClickCE, false);

$buttonEqual.addEventListener('click', handleClickEqual, false);

function visorShow(entry) {
  $visor.value = entry;
}

function handleClickCE() {
  visorShow(0);
}

function handleClickNumber() {
  $visor.value == 0
    ? visorShow(this.value)
    : visorShow($visor.value += this.value);
}

function handleClickOperation() {
    isLastOperator($visor.value)
    ? visorShow($visor.value.replace(/[\+\-\x\÷]$/g, this.value))
    : visorShow($visor.value += this.value);
}

function isLastOperator(value) {
  var regex = /[\+\-\x\÷]$/g;
  return regex.test(value);
}

function handleClickEqual() {
  var operation = splitOperation($visor.value);

  var calcResult = operation.operands.reduce(function(accumulated, current, index) {
    return calcOperations[operation.operators[index - 1]](accumulated, current);
  });

  visorShow(calcResult);
}

function splitOperation(value) {
  var operands = value.match(/\d+/g);
  var operators = value.match(/\D+/g);

  return {
    operands: operands,
    operators: operators
  }
}
