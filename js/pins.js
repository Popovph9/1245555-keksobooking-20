'use strict';

window.pins = (function () {
  var PINS = 8;

  var pinsOnMap = document.querySelector('.map__pins');
  var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

  return {
    loadDataHandler: function (notification) {
      window.rand.shuffle(notification);
      for (var i = 0; i < PINS; i++) {
        var pinFragment = similarPin.cloneNode(true);
        pinFragment.style.left = notification[i].location.x + 'px';
        pinFragment.style.top = notification[i].location.y + 'px';
        pinFragment.querySelector('img').src = notification[i].author.avatar;
        pinFragment.querySelector('img').alt = notification[i].offer.title;
        pinsOnMap.appendChild(pinFragment);
      }

      var currentPins = document.querySelectorAll('.map__pin');

      var elc = function (element, datanmbr) {
        element.addEventListener('click', function () {
          window.card.renderCard(notification[datanmbr]);
        });
      };

      for (var z = 1; z < currentPins.length; z++) {
        elc(currentPins[z], z - 1);
      }
    },


    removePin: function () {
      var renderedPins = pinsOnMap.getElementsByTagName('button');
      for (var i = renderedPins.length - 1; i >= 1; i--) {
        renderedPins[i].remove();
      }

    }
  };
})();
