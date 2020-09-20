// Enum sound game
enum gameEfect {
    flip,
    success,
}

class Sound {

    private activeSoundEfects: boolean = true;
    private sucessSound: HTMLAudioElement;
    private flipCardSound: HTMLAudioElement;

    constructor(flipCardSound: HTMLAudioElement, sucessSound: HTMLAudioElement) {
        this.flipCardSound = flipCardSound;
        this.sucessSound = sucessSound;
    }

    setEnabledSoundEfect(enabled: boolean): void {
        this.activeSoundEfects = enabled;
    }

    play(option: gameEfect): void {
        if (!this.activeSoundEfects) {
            return;
        }
        let selectedSound: HTMLAudioElement;
        switch (option) {
            case gameEfect.flip:
                selectedSound = this.flipCardSound;
                break;
            case gameEfect.success:
                selectedSound = this.sucessSound;
                break;
            default:
                return;
        }
        selectedSound.currentTime = 0;
        selectedSound.play();
    }

}


