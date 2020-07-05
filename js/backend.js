'use strict';

(function () {
  var TIMEOUT = 100000;
  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };
  var StatusCode = {
    OK: 200
  };
  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var createXhr = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;


    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    createXhr(onLoad, onError, Method.GET, Url.LOAD);
  };

  var save = function (data, onLoad, onError) {
    createXhr(onLoad, onError, Method.POST, Url.SAVE, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
