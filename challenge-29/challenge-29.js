(function() {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  function app() {
    var $header = document.querySelector('[data-js="header"]');

    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'company.json');
    ajax.send();

    ajax.addEventListener('readystatechange', function () {
      if (ajax.readyState === 4 && this.status == 200) {
        var response = JSON.parse(ajax.responseText);
        $header.innerHTML = '<h2>' + response.name + ' - ' + response.phone +'</h2>';
      }
    })

    var $table = document.querySelector('[data-js="table"]');

    var $image = document.querySelector('[data-js="image"]');
    var $car = document.querySelector('[data-js="car"]');
    var $year = document.querySelector('[data-js="year"]');
    var $plate = document.querySelector('[data-js="plate"]');
    var $color = document.querySelector('[data-js="color"]');

    var $submit = document.querySelector('[data-js="submit"]');

    $submit.addEventListener('click', function (event) {
      event.preventDefault();
      addNewRow();
    })

    function addNewRow() {
      var row =
        '<div class="table-cel col"> <img width="100%" height="auto" src="' + $image.value + '"></div>' +
        '<div class="table-cel col">' + $car.value + '</div>' +
        '<div class="table-cel col">' + $year.value + '</div>' +
        '<div class="table-cel col">' + $plate.value + '</div>' +
        '<div class="table-cel col">' + $color.value + '</div>';

      $table.innerHTML += row;
    }
  }

  window.app = app();

})();
