declare var Swal: any;
const CARD_FLIP_TRANSITION_TIME: number = 800;


class Game {
    private cards: HTMLCollectionOf<HTMLDivElement>;
    private images: Array<string>;
    private turn: number = 1;
    private card1: HTMLDivElement | null = null;
    private card2: HTMLDivElement | null = null;
    private blockFlip: boolean = false;
    private timer: Timer;
    private sound: Sound;
    private failuresCount: number = 0;
    private failuresDisplay: HTMLSpanElement;
    private control: Control;

    constructor(cards: HTMLCollectionOf<HTMLDivElement>, images: Array<string>, timer: Timer, sound: Sound, failuresDisplay: HTMLSpanElement, control: Control) {
        this.cards = cards;
        this.images = shuffle(images);
        this.timer = timer;
        this.sound = sound;
        this.failuresDisplay = failuresDisplay;
        this.control = control;
        this.setEvents();
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.remove("block");
            this.cards[i].getElementsByClassName("img-back")[0].setAttribute("src", this.images[i]);
        }
    }

    private setEvents(): void {
        let self = this;
        // Add event listener
        this.control.getBtnSoundEfect().addEventListener("click", function () {
            self.onSoundEfect();
        });
        this.control.getBtnReset().addEventListener("click", function () {
            self.onReset();
        })
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].addEventListener("click", (evt) => {
                this.onClickCard(i);
            });
        }
    }

    public onClickCard(position: number): void {
        if (this.isEndGame()) {
            console.log("End game");
            return;
        }
        this.timer.start();
        if (this.isCardBlocked(position)) {
            console.log("> Carta já retirada");
            return;
        }
        if (this.isSelectedCard(position)) {
            console.log("> carta já selecionado")
            return;
        }
        // flip card
        this.cards[position].classList.add("flip");
        this.sound.play(gameEfect.flip);
        let self: Game = this;
        // wait card flip
        setTimeout(function () {
            if (self.turn == 1) {
                self.card1 = self.cards[position];
                self.turn = 2;
            } else {
                self.card2 = self.cards[position];
                self.turn = 1;
                let img1 = self.card1?.getElementsByClassName("img-back")[0].getAttribute("src");
                let img2 = self.card2?.getElementsByClassName("img-back")[0].getAttribute("src");
                if (img1 == img2) {
                    console.log("> imagens iguais")
                    self.card1?.classList.add("block");
                    self.card2?.classList.add("block");
                    self.sound.play(gameEfect.success);
                } else {
                    console.log("> imagens diferente");
                    self.sound.play(gameEfect.flip);
                    self.card1?.classList.remove("flip");
                    self.card2?.classList.remove("flip");
                    self.increaseFailures();
                }
                self.card1 = null;
                if (self.isEndGame()) {
                    self.timer.pause();
                    console.log("Fim do jogo");
                    Swal.fire(
                        {
                            "title": "Congratulations",
                            "text": `You won in ${timeFormat(self.timer.getTime())} with ${self.failuresCount} failures`,
                            "icon": "success",
                            "allowOutsideClick": false,
                            "willClose": function () {
                                self.restart();
                            }
                        }
                    );
                }
            }
        }, CARD_FLIP_TRANSITION_TIME);

    }

    public restart() {
        this.shuffle();
    }

    public onReset(): void {
        this.sound.play(gameEfect.flip);
        this.showCards();
        this.shuffle();
    }

    public onSoundEfect(): void {
        if (this.sound.isEnabledSoundEfect()) {
            this.sound.setEnabledSoundEfect(false);
            this.control.getBtnSoundEfect().innerHTML = '<i class="fas fa-volume-off fa-lg"></i>'
        } else {
            this.sound.setEnabledSoundEfect(true);
            this.control.getBtnSoundEfect().innerHTML = '<i class="fas fa-volume-up fa-lg"></i>'
        }
    }

    private isSelectedCard(position: number): boolean {
        return this.cards[position] == this.card1;
    }

    private isCardBlocked(position: number): boolean {
        return this.cards[position].classList.contains("block");
    }

    private resetFailures(): void {
        this.failuresCount = 0;
        this.failuresDisplay.innerHTML = "0";
    }

    private increaseFailures(): void {
        this.failuresCount++;
        this.failuresDisplay.innerHTML = "" + this.failuresCount;
    }

    private showCards(): void {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.add("flip");
        }
    }

    private hideCards(): void {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.remove("flip");
        }
    }

    private shuffle(): void {
        this.timer.reset();
        this.resetFailures();
        setTimeout(() => {
            this.sound.play(gameEfect.flip);
            this.hideCards();
            setTimeout(() => {
                this.images = shuffle(this.images);
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].classList.remove("block");
                    this.cards[i].getElementsByClassName("img-back")[0].setAttribute("src", this.images[i]);
                }
                //this.showCards();/* for test*/
            }, CARD_FLIP_TRANSITION_TIME + 100);
        }, CARD_FLIP_TRANSITION_TIME + 100);
    }

    private isEndGame(): boolean {
        for (let i = 0; i < this.cards.length; i++) {
            if (!this.cards[i].classList.contains("block")) {
                return false;
            }
        }
        return true;
    }

}