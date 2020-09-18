"use strict";
var IMAGE_ROOT = "img/";
var DELAY = 800;
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
        this.turn = 1;
        this.card1 = null;
        this.card2 = null;
        this.blockFlip = false;
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
        if (this.blockFlip) {
            console.log("Block flip");
            return;
        }
        if (this.cards[position].classList.contains("block")) {
            console.log("Carta já retirada");
            return;
        }
        // flip card
        this.cards[position].classList.add("flip");
        var self = this;
        // wait card flip
        setTimeout(function () {
            var _a, _b, _c, _d, _e, _f;
            if (self.turn == 1) {
                self.card1 = self.cards[position];
                self.turn = 2;
            }
            else {
                if (self.cards[position] == self.card1) {
                    console.log("> Card já selecionado");
                    return;
                }
                self.card2 = self.cards[position];
                self.turn = 1;
                var img1 = (_a = self.card1) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("img")[0].src;
                var img2 = (_b = self.card2) === null || _b === void 0 ? void 0 : _b.getElementsByTagName("img")[0].src;
                console.log(">> ", img1, ", ", img2);
                if (img1 == img2) {
                    console.log("> imagens iguais");
                    (_c = self.card1) === null || _c === void 0 ? void 0 : _c.classList.add("block");
                    (_d = self.card2) === null || _d === void 0 ? void 0 : _d.classList.add("block");
                }
                else {
                    console.log("> imagens diferente");
                    (_e = self.card1) === null || _e === void 0 ? void 0 : _e.classList.remove("flip");
                    (_f = self.card2) === null || _f === void 0 ? void 0 : _f.classList.remove("flip");
                }
                if (self.isEndGame()) {
                    alert("Fim do jogo");
                }
            }
        }, DELAY);
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
    Game.prototype.shuffle = function () {
        var _this = this;
        this.showCards();
        setTimeout(function () {
            _this.hideCards();
            setTimeout(function () {
                _this.images = shuffle(_this.images);
                for (var i = 0; i < _this.cards.length; i++) {
                    _this.cards[i].classList.remove("block");
                    _this.cards[i].getElementsByTagName("img")[0].src = _this.images[i];
                }
                //this.showCards();// for test
            }, DELAY + 100);
        }, DELAY + 100);
    };
    Game.prototype.isEndGame = function () {
        for (var i = 0; i < this.cards.length; i++) {
            if (!this.cards[i].classList.contains("block")) {
                return false;
            }
        }
        return true;
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
//img = shuffle(img);
var grid = document.getElementById("grid");
img.forEach(function (e) {
    var card = buildCard(e);
    grid.appendChild(card);
});
var cards = document.getElementsByClassName("card");
var game = new Game(cards, img);
