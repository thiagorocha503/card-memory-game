const IMAGE_ROOT = "img/";
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
    private count:number = 0;


    constructor(cards: HTMLCollectionOf<HTMLDivElement>, images: Array<string>) {
        this.cards = cards;
        this.images = images;
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].addEventListener("click", (evt) => {
                this.onClickCard(i)
            });
        }
        //this.shuffle();
    }

    public onClickCard(position: number) {
        this.count++;
        console.log("> " + position);
        this.cards[position].classList.remove("flip");
        if(this.count == 2){
            setTimeout(()=>{
                this.hideCard();
                this.count = 0;
            }, 2000)
            
        }
        
    }

    public new(){
        this.images = shuffle(this.images);
        this.showCard();

        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].
                getElementsByTagName("img")[0]
                .setAttribute("src", this.images[i]);
        }
        setTimeout(() => {
            this.hideCard();
        }, 2000);
    }
    private shuffle() {
        this.images = shuffle(this.images);
        this.hideCard();
        setTimeout(() => {
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].
                    getElementsByTagName("img")[0]
                    .setAttribute("src", this.images[i]);
            }
            this.showCard();
        }, 2000);



    }

    private hideCard() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.remove("flip");
        }
    }
    private showCard() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.add("flip");
        }
    }

}



function buildCard(img: string) {
    let card: HTMLElement = document.createElement("div");
    card.className = "card";
    card.insertAdjacentHTML("afterbegin", `
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
    `);
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

img = shuffle(img);
let grid: HTMLElement = document.getElementById("grid") as HTMLElement;
img.forEach((e) => {
    let card = buildCard(e);
    grid.appendChild(card)
})
let cards: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLDivElement>;
let game = new Game(cards, img);