var buttonOpen = document.querySelector(".page-header__button");
var menu = document.querySelector(".main-nav");
var pageHeader = document.querySelector(".page-header");
var form = document.querySelector(".form-review");
var nameTourist = form.querySelector("#name");
var surnameTourist = form.querySelector("#surname");
var telTourist = form.querySelector("#tel");
var emailTourist = form.querySelector("#email");
var messageError = document.querySelector(".info-inner__error");
var messageSabmit = document.querySelector(".info-inner__message");
var buttonForm = document.querySelector(".button-form");
var buttonPopup = document.querySelector(".button-form__popup");


menu.classList.add("main-nav--closed");
buttonOpen.classList.add("page-header__toggle");

buttonOpen.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (pageHeader.classList.contains("page-header--closed") ) { //.page-header--closed меню закрытое
    menu.classList.toggle("main-nav--closed");
    pageHeader.classList.toggle("page-header--closed");
    pageHeader.classList.add("page-header--opened");  // .page-header--opened меню открытое
  } else {
    pageHeader.classList.toggle("page-header--opened");
    pageHeader.classList.add("page-header--closed");
    menu.classList.toggle("main-nav--closed");
  }
});

form.addEventListener("submit", function(evt) {

  var valid = true;

  if (!nameTourist.value) {
    valid = false;
    nameTourist.classList.add("form-review__input--error");
  }

  if (!surnameTourist.value) {
    valid = false;
    surnameTourist.classList.add("form-review__input--error");
  }

  if (!telTourist.value) {
    valid = false;
    telTourist.classList.add("form-review__input--error");
  }

  if (!emailTourist.value) {
    valid = false;
    emailTourist.classList.add("form-review__input--error");
  }

  if (valid) {
    messageSabmit.classList.add("info-inner--show");
  }
  else {
    evt.preventDefault();
    messageError.classList.add("info-inner--show");
  }
});

buttonPopup.addEventListener("click", function(evt) {
  messageError.classList.remove("info-inner--show");
});
