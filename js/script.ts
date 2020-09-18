const IMAGE_ROOT = "img/";
const DELAY: number = 800;

function shuffle(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

class Game {
    private cards: HTMLCollectionOf<HTMLDivElement>;
    private images: Array<string>;
    private turn: number = 1;
    private card1: HTMLDivElement| null = null;
    private card2: HTMLDivElement| null = null;
    private blockFlip: boolean = false;

    constructor(cards: HTMLCollectionOf<HTMLDivElement>, images: Array<string>) {
        this.cards = cards;
        this.images = images;
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].addEventListener("click", (evt) => {
                this.onClickCard(i);
            });
        }
    }
    onClickCard(position: number){
        if(this.blockFlip){
            console.log("Block flip")
            return;
        }
        if(this.cards[position].classList.contains("block")){
            console.log("Carta já retirada");
            return;
        }
        // flip card
        this.cards[position].classList.add("flip");
        let self: Game = this;
        // wait card flip
        setTimeout(function(){
            if(self.turn == 1) {
                self.card1 = self.cards[position];
                self.turn = 2;
            } else {
                if(self.cards[position] == self.card1){
                    console.log("> Card já selecionado")
                    return;
                }
                self.card2 = self.cards[position];
                self.turn = 1;
                let img1 = self.card1?.getElementsByTagName("img")[0].src;
                let img2 = self.card2?.getElementsByTagName("img")[0].src;
                console.log(">> ",img1,", ",img2)
                if(img1 == img2){
                    console.log("> imagens iguais")
                    self.card1?.classList.add("block");
                    self.card2?.classList.add("block");
                } else {
                    console.log("> imagens diferente")
                    self.card1?.classList.remove("flip");
                    self.card2?.classList.remove("flip");
                }

                if(self.isEndGame()){
                    alert("Fim do jogo");
                }
            }
        }, DELAY);
       
        

    }
    showCards(): void {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.add("flip");
        }
    }

    hideCards(): void {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.remove("flip");
        }
    }

    shuffle():void{
        this.showCards();
        setTimeout(()=>{
            this.hideCards();     
            setTimeout(()=>{
                this.images = shuffle(this.images);
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].classList.remove("block");
                    this.cards[i].getElementsByTagName("img")[0].src = this.images[i];
                }
                //this.showCards();// for test
            },DELAY+100);
        }, DELAY+100);
    }

    isEndGame(){
        for (let i = 0; i < this.cards.length; i++) {
            if(!this.cards[i].classList.contains("block")){
                return false;
            }
        }
        return true;
    }

}

function buildCard(img: string) {
    let card: HTMLElement = document.createElement("div");
    card.className = "card";
    card.insertAdjacentHTML("afterbegin",
    `
    <div class="front">
        <div class="self-align-center">
                Front
            </div>
        </div>
        <div class="back">
            <div class="self-align-center">
                <img src=${img}>
            </div>         
        </div>
    `
    );
    return card;
}
let img: Array<string> = [
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
let grid: HTMLElement = document.getElementById("grid") as HTMLElement;
img.forEach((e) => {
    let card = buildCard(e);
    grid.appendChild(card);
});
let cards: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLDivElement>;
let game = new Game(cards, img);
