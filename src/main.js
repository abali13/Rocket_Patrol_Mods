/*
Aditya Bali
Rocket Patrol, modded
7-8 Hours
Mods:
    -Track a high score that persists across scenes and display it in the UI (5)
    -Implement the 'FIRE' UI text from the original game (5)
    -Implement the speed increase that happens after 30 seconds in the original game (5)
    -Display the time remaining (in seconds) on the screen (10)
    -Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)


*/
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