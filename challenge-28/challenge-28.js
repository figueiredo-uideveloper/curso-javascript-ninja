(function () {
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, successo ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  var $cep = document.querySelector('[data-js="cep"]');
  var $logradouro = document.querySelector('[data-js="logradouro"]');
  var $bairro = document.querySelector('[data-js="bairro"]');
  var $estado = document.querySelector('[data-js="estado"]');
  var $cidade = document.querySelector('[data-js="cidade"]');
  var $btnSubmit = document.querySelector('[data-js="submit"]');
  var $status = document.querySelector('[data-js="status"]');

  var logradouroResponse;
  var bairroResponse;
  var estadoResponse;
  var cidadeResponse;

  var ajax = new XMLHttpRequest();
  var response;

  ajax.addEventListener( 'readystatechange', function () {
    if(isRequestLoading()) {
      statusMessage('loading');
    }

    if (isRequestDone()) {
      try {
        isRequestSuccess('Successo');
      } catch(error) {
        isRequestError('CEP inválido');
      }
    }

  })


  $btnSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    var url = cepUrl(
      "https://ws.apicep.com/cep/[cepCode].[format]",
      "json",
      $cep.value
    );

    ajax.open(
      "GET",
      url
    );
    ajax.send();

  })



  function cepUrl(apiUrl, apiFileFormat, cep) {
    var regex = /\D+/g;
    var cepOnlyNumbers = cep.replace(regex, "");
    return apiUrl.replace("[cepCode]", cepOnlyNumbers).replace('[format]', apiFileFormat);
  }

  function isRequestLoading () {
    return ajax.readyState !== 4;
  }

  function isRequestDone() {
    return ajax.readyState === 4;
  }

  function isRequestSuccess() {
    response = JSON.parse(ajax.responseText);
    fillFields(response);
    statusMessage('success');
  }

  function isRequestError() {
    statusMessage('error');
  }

  function statusMessage(typeMessage) {
    var typeMessages = {
      loading: "Buscando informações para o CEP " + $cep.value + "...",
      success: "Endereço referente ao CEP " + $cep.value + ".",
      error: "Não encontramos o endereço para o CEP " + $cep.value + ".",
    };

    $status.innerHTML = typeMessages[typeMessage];
  }

  function fillFields(response) {
    logradouroResponse = response.address;
    bairroResponse = response.district;
    estadoResponse = response.state;
    cidadeResponse = response.city;

    $logradouro.value = logradouroResponse;
    $bairro.value = bairroResponse;
    $estado.value = estadoResponse;
    $cidade.value = cidadeResponse;
  }
})();
