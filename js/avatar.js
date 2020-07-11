'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var AVATAR_SIZE = {
    width: '70px',
    height: '70px'
  };

  var userAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var flatAvatarChooser = document.querySelector('.ad-form__upload input[type=file]');
  var userAvatarPreview = document.querySelector('.ad-form-header__preview img');
  var flatAvatarPreviewBlock = document.querySelector('.ad-form__photo');

  userAvatarChooser.setAttribute('disabled', 'disabled');
  flatAvatarChooser.setAttribute('disabled', 'disabled');

  var renderUserAvatar = function () {
    var file = userAvatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userAvatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var userAvatarChangeHandler = function () {
    renderUserAvatar();
  };

  var createFlatAvatar = function () {
    var flatAvatarPreview = document.createElement('img');
    flatAvatarPreview.alt = 'Аватар пользователя';
    flatAvatarPreview.style.width = AVATAR_SIZE.width;
    flatAvatarPreview.style.height = AVATAR_SIZE.height;
    flatAvatarPreviewBlock.appendChild(flatAvatarPreview);
    return flatAvatarPreview;
  };

  var renderFlatAvatar = function () {
    window.card.removeChildren(flatAvatarPreviewBlock);
    createFlatAvatar();
    var flatAvatarPreview = document.querySelector('.ad-form__photo img');

    var file = flatAvatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        flatAvatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var flatAvatarChangeHandler = function () {
    renderFlatAvatar();
  };

  var avatarReset = function () {
    userAvatarPreview.src = DEFAULT_AVATAR;
    if (document.querySelector('.ad-form__photo img')) {
      var flatAvatarPreview = document.querySelector('.ad-form__photo img');
      flatAvatarPreview.remove();
    }
  };

  window.avatar = {
    avatarReset: avatarReset,

    userAvatarChangeHandler: userAvatarChangeHandler,

    flatAvatarChangeHandler: flatAvatarChangeHandler,

    userAvatarChooser: userAvatarChooser,

    flatAvatarChooser: flatAvatarChooser
  };
})();
