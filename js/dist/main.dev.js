"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(name, avatar) {
  _classCallCheck(this, User);

  this.name = name;
  this.avatar = avatar;
};

var CommentFromUser =
/*#__PURE__*/
function () {
  function CommentFromUser(user, message) {
    _classCallCheck(this, CommentFromUser);

    this.user = user;
    this.message = message;
  }

  _createClass(CommentFromUser, [{
    key: "getDOM",
    value: function getDOM() {
      var commentTemplate = document.querySelector("#comment");
      var commentListElement = commentTemplate.content.querySelector(".social__comment");
      var commentUserAvatar = commentListElement.querySelector(".social__picture");
      var commentText = commentListElement.querySelector(".social__text");
      commentUserAvatar.setAttribute("src", this.user.avatar);
      commentText.textContent = this.message;
      return document.importNode(commentTemplate.content, true);
    }
  }]);

  return CommentFromUser;
}();

var Photo =
/*#__PURE__*/
function () {
  function Photo(url, likes, comments, description) {
    _classCallCheck(this, Photo);

    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
  }

  _createClass(Photo, [{
    key: "getDOM",
    value: function getDOM(data) {
      var pictureTemplate = document.querySelector("#picture");
      var pictureLink = pictureTemplate.content.querySelector(".picture");
      var pictureImage = pictureLink.querySelector(".picture__img");
      var pictureInfo = pictureLink.querySelector(".picture__info");
      var pictureComments = pictureInfo.querySelector(".picture__comments");
      var pictureLikes = pictureInfo.querySelector(".picture__likes");
      pictureImage.setAttribute("src", this.url);
      pictureComments.textContent = this.comments.length;
      pictureLikes.textContent = this.likes;
      pictureLink.setAttribute("data", data);
      return document.importNode(pictureTemplate.content, true);
    }
  }]);

  return Photo;
}();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function choiceFromArray(arr) {
  var len = arr.length;
  return arr[getRandomInt(0, len)];
}

function generatePhotos() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;
  var res = [];

  for (var i = 0; i < count; i++) {
    var url = "photos/".concat(i + 1, ".jpg");
    var likes = getRandomInt(15, 201);
    var description = choiceFromArray(DESCRIPTIONS);
    var comments = [];

    for (var _i = 0; _i < COMMENTS_COUNT; _i++) {
      // let user = new User(choiceFromArray(NAMES), `img/avatar-${getRandomInt(1, 7)}.svg`);
      // let comment = new CommentFromUser(user, choiceFromArray(MESSAGES));
      var user = {
        name: choiceFromArray(NAMES),
        avatar: "img/avatar-".concat(getRandomInt(1, 7), ".svg")
      };
      var comment = {
        user: user,
        message: choiceFromArray(MESSAGES)
      };
      comments.push(comment);
    }

    res.push({
      url: url,
      likes: likes,
      comments: comments,
      description: description
    });
  }

  return res;
}

var rawPhotos = generatePhotos(); // console.log(rawPhotos);

function parsePhotos(photos) {
  var res = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = photos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var raw_photo = _step.value;
      var url = raw_photo.url;
      var likes = raw_photo.likes;
      var description = raw_photo.description;
      var comments = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = raw_photo.comments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var comment = _step2.value;
          var user = new User(comment.user.name, comment.user.avatar);
          var message = comment.message;
          comments.push(new CommentFromUser(user, message));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      res.push(new Photo(url, likes, comments, description));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return res;
}

var photos = parsePhotos(rawPhotos); // console.log(photos)

if ('content' in document.createElement('template')) {
  var pictures = document.querySelector(".pictures");

  for (var i = 0; i < photos.length; i++) {
    var photoDOM = photos[i].getDOM(i);
    pictures.appendChild(photoDOM);
  }
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  var _loop = function _loop() {
    var photoElement = _step3.value;
    photoElement.addEventListener("click", function () {
      var big = document.querySelector(".big-picture");
      var data = photoElement.getAttribute("data");
      var photo = photos[Number.parseInt(data)];
      var bigPicPreview = big.querySelector(".big-picture__preview");
      bigPicPreview.querySelector(".big-picture__img>img").setAttribute("src", photo.url);
      var bigPicSocial = bigPicPreview.querySelector(".big-picture__social");
      bigPicSocial.querySelector(".social__caption").textContent = photo.description;
      bigPicSocial.querySelector(".social__likes>.likes-count").textContent = photo.likes;
      bigPicSocial.querySelector(".social__comment-count>.comments-count").textContent = photo.comments.length;
      var comments = bigPicSocial.querySelector(".social__comments");
      comments.innerHTML = "";
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = photo.comments[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var comment = _step4.value;
          comments.appendChild(comment.getDOM());
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      bigPicPreview.querySelector(".big-picture__cancel").addEventListener("click", function () {
        big.classList.add("hidden");
      });
      big.classList.remove("hidden");
    });
  };

  for (var _iterator3 = document.querySelectorAll("a.picture")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
      _iterator3["return"]();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}