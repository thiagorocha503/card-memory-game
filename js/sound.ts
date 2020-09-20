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
        switch (option) {
            case gameEfect.flip:
                this.flipCardSound.play();
                break;
            case gameEfect.success:
                this.sucessSound.play();
                break;
            default:
                return;
        }

    }
    
}


