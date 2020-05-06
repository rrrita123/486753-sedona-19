"use strict";

var buttonOpen = document.querySelector(".page-header__button");
var menu = document.querySelector(".main-nav");
var pageHeader = document.querySelector(".page-header");

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

// Проверка заполнения обязательных полей в форме
if(document.querySelector(".form-review")) {
  var form = document.querySelector(".form-review");
  var messageError = document.querySelector(".info-inner__error");
  var messageSabmit = document.querySelector(".info-inner__message");
  var collectionButton = document.querySelectorAll(".button-form__popup");
  var collectionInput = form.querySelectorAll(".js-input");

  collectionInput.forEach((i) => {
    i.required = false; // отмена required у input
  });

  form.addEventListener("submit", function(evt) {
    var valid = true;
    collectionInput.forEach((i) => {
      if (!i.value) {
        valid = false;
        i.classList.add("form-review__input--error");
      } else {
        i.classList.remove("form-review__input--error");
      }
    })

    if (valid) {
      messageSabmit.classList.add("info-inner--show");
    }
    else {
      evt.preventDefault();
      messageError.classList.add("info-inner--show");
    }
  });

  collectionButton.forEach((b) => {
    b.addEventListener("click", function(evt) {
    this.closest(".info-inner--show").classList.remove("info-inner--show");
  });
})

}

//Create map
var map;
function initMap() {
  map = new google.maps.Map(
    document.getElementById("map"),
    {center: new google.maps.LatLng(34.961755, -111.758092), zoom: 7}
  );

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(34.961755, -111.758092),
    map: map
  });
}

// для скрипта Picture element, чтобы отображались в ie
document.createElement("picture");

// для отображение svg спрайтов в ie
svg4everybody();
