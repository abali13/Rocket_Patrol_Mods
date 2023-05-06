//console.log("hello world");
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

function create(){
    this.timeInSec = (game.settings.gameTimer) / 1000;
    let timerConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'center',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 100
    }
    this.timerText = this.add.text(game.config.height / 2, borderUISize + borderPadding*2, "0:00", timerConfig);
    this.timer = this.time.addEvent({ delay: 1000, callback: onEvent(), callbackScope: this, loop: true });
    
}
function onEvent(){
    this.timeInSec--;
    this.timerText.text = this.timeInSec;
}