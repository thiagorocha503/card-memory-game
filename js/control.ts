class Control {
    
    private btnSoundEfect: HTMLButtonElement;
    private btnReset: HTMLButtonElement;

    constructor(btnsoundEfect: HTMLButtonElement, btnReset: HTMLButtonElement) {
        this.btnReset = btnReset;
        this.btnSoundEfect = btnsoundEfect;
    }

    getBtnSoundEfect(): HTMLButtonElement {
        return this.btnSoundEfect;
    }

    getBtnReset(): HTMLButtonElement {
        return this.btnReset;
    }
}