"use strict";
class User {
  constructor(name, avatar) {
    this.name = name;
    this.avatar = avatar;
  }
}

class CommentFromUser {
  constructor(user, message) {
    this.user = user;
    this.message = message;
  }

  getDOM() {
    var commentTemplate = document.querySelector("#comment");
    var commentListElement = commentTemplate.content.querySelector(".social__comment");
    var commentUserAvatar = commentListElement.querySelector(".social__picture");
    var commentText = commentListElement.querySelector(".social__text");

    commentUserAvatar.setAttribute("src", this.user.avatar);
    commentText.textContent = this.message;

    return document.importNode(commentTemplate.content, true);
  }
}

class Photo {
  constructor(url, likes, comments, description) {
    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
  }
  getDOM(data) {
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
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function choiceFromArray(arr) {
  let len = arr.length;
  return arr[getRandomInt(0, len)];
}

function generatePhotos(count = 25) {
  let res = []
  for (let i = 0; i < count; i++) {
    let url = `photos/${i+1}.jpg`;
    let likes = getRandomInt(15, 201);
    let description = choiceFromArray(DESCRIPTIONS);
    let comments = [];

    for (let i = 0; i < COMMENTS_COUNT; i++) {
      let user = new User(choiceFromArray(NAMES), `img/avatar-${getRandomInt(1, 7)}.svg`);
      let comment = new CommentFromUser(user, choiceFromArray(MESSAGES));

      comments.push(comment);
    }

    res.push(new Photo(url, likes, comments, description));
  }
  return res;
}

var photos = generatePhotos()

function showBigPhoto() {

}


if ('content' in document.createElement('template')) {
  var pictures = document.querySelector(".pictures");

  for (let i = 0; i < photos.length; i++) {
    var photoDOM = photos[i].getDOM(i);
    pictures.appendChild(photoDOM);
  }
}

for (let photoElement of document.querySelectorAll("a.picture")) {
  photoElement.addEventListener("click", () => {
    var big = document.querySelector(".big-picture");
    var data = photoElement.getAttribute("data");
    var photo = photos[Number.parseInt(data)];
    var bigPicPreview = big.querySelector(".big-picture__preview");
    bigPicPreview.querySelector(".big-picture__img>img").setAttribute("src", photo.url);

    var bigPicSocial = bigPicPreview.querySelector(".big-picture__social");
    bigPicSocial.querySelector(".social__caption").textContent = photo.description;
    bigPicSocial.querySelector(".social__likes>.likes-count").textContent = photo.likes;

    bigPicSocial.querySelector(".social__comment-count>.comments-count")
      .textContent = photo.comments.length;

    var comments = bigPicSocial.querySelector(".social__comments");
    comments.innerHTML = "";
    for (let comment of photo.comments) {
      comments.appendChild(comment.getDOM());
    }
    bigPicPreview.querySelector(".big-picture__cancel").addEventListener("click", () =>{
      big.classList.add("hidden");
    })
    big.classList.remove("hidden");
  });
}
