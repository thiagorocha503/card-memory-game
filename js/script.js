"use strict";
var IMAGE_ROOT = "img/";
function shuffle(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
var Game = /** @class */ (function () {
    function Game(cards, images) {
        var _this = this;
        this.count = 0;
        this.cards = cards;
        this.images = images;
        var _loop_1 = function (i) {
            this_1.cards[i].addEventListener("click", function (evt) {
                _this.onClickCard(i);
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.cards.length; i++) {
            _loop_1(i);
        }
    }
    Game.prototype.onClickCard = function (position) {
    };
    Game.prototype.showCards = function () {
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.add("flip");
        }
    };
    Game.prototype.hideCards = function () {
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.remove("flip");
        }
    };
    return Game;
}());
function buildCard(img) {
    var card = document.createElement("div");
    card.className = "card";
    card.insertAdjacentHTML("afterbegin", "\n    <div class=\"front\">\n        <div class=\"self-align-center\">\n                Front\n            </div>\n        </div>\n        <div class=\"back\">\n            <div class=\"self-align-center\">\n                <img src=" + img + ">\n            </div>         \n        </div>\n    ");
    return card;
}
var img = [
    IMAGE_ROOT + "c-sharp.png",
    IMAGE_ROOT + "c-sharp.png",
    IMAGE_ROOT + "java.png",
    IMAGE_ROOT + "java.png",
    IMAGE_ROOT + "python.png",
    IMAGE_ROOT + "python.png",
    IMAGE_ROOT + "php.png",
    IMAGE_ROOT + "php.png",
    IMAGE_ROOT + "swift.png",
    IMAGE_ROOT + "swift.png",
    IMAGE_ROOT + "go.png",
    IMAGE_ROOT + "go.png",
    IMAGE_ROOT + "js.png",
    IMAGE_ROOT + "js.png",
    IMAGE_ROOT + "c.png",
    IMAGE_ROOT + "c.png",
    IMAGE_ROOT + "c++.png",
    IMAGE_ROOT + "c++.png",
];
img = shuffle(img);
var grid = document.getElementById("grid");
img.forEach(function (e) {
    var card = buildCard(e);
    grid.appendChild(card);
});
var cards = document.getElementsByClassName("card");
var game = new Game(cards, img);
