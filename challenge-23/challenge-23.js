(function() {
    /*
    Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
    As regras são:

    - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
    diretamente;
    - O input deve iniciar com valor zero;
    - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
    - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
    multiplicação(x) e divisão(÷);
    - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
    que irá limpar o input, deixando-o com valor 0;

    - A cada número pressionado, o input deve atualizar concatenando cada valor
    digitado, como em uma calculadora real;
    - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
    operação no input. Se o último caractere no input já for um símbolo de alguma
    operação, esse caractere deve ser substituído pelo último pressionado.
    Exemplo:
    - Se o input tem os valores: "1+2+", e for pressionado o botão de
    multiplicação (x), então no input deve aparecer "1+2x".
    - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
    input;
    - Ao pressionar o botão "CE", o input deve ficar zerado.
    */

    var $display = document.querySelector('input');
    var $clear = document.querySelector('[data-js="clear"]');
    var $numbers = document.querySelectorAll('[data-js="number"]');
    var $operators = document.querySelectorAll('[data-js="operator"]');
    var $result = document.querySelector('[data-js="result"]');

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

    $clear.addEventListener('click', clearDisplay);

    $numbers.forEach(function (number) {
      number.addEventListener("click", enterNumber);
    });

    $operators.forEach(function(operator) {
      operator.addEventListener('click', enterOperator);
    })

    $result.addEventListener('click', calcResult);

    function displayShow(entry) {
      $display.value = entry;
    }

    function clearDisplay() {
      displayShow(0);
    }

    function enterNumber() {
      $display.value == 0
        ? displayShow(this.value)
        : displayShow($display.value += this.value);
    }

    function enterOperator() {
        isLastOperator($display.value)
        ? displayShow($display.value.replace(/[\+\-\x\÷]$/g, this.value))
        : displayShow($display.value += this.value);
    }

    function isLastOperator(value) {
      var regex = /[\+\-\x\÷]$/g;
      return regex.test(value);
    }

    function calcResult() {
      var operation = splitOperation($display.value);

      var calcResult = operation.operands.reduce(function(accumulated, current, index) {
        return calcOperations[operation.operators[index - 1]](accumulated, current);
      });

      displayShow(calcResult);
    }

    function splitOperation(value) {
      var operands = value.match(/\d+/g);
      var operators = value.match(/\D+/g);

      return {
        operands: operands,
        operators: operators
      }
    }
})();
