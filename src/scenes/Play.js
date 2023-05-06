class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        this.highScore = 0;
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      }
    create(){
        //this.add.text(20, 20, "Rocket Patrol Play");
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score initialize
        this.p1Score = 0;
        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        //Display high score
        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
            
        }
        this.scoreRight = this.add.text(game.config.height, borderUISize + borderPadding*2, this.highScore, highScoreConfig);
        
        
        //this.timer = this.time.addEvent({ delay: 1000, callback: onEvent(), callbackScope: this, loop: true });
        
        
        
        
        //Game over flag
        this.gameOver = false;


        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);


        //Timer text config 
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
        this.timerText = this.add.text((game.config.height / 2) + borderPadding, borderUISize + borderPadding*2, this.timeInSec, timerConfig);
       // console.log(this.clock.getElapsedSeconds())

        //Flag for timed speed
        this.speedFlag = false;
    }
/*
    onEvent(){
        this.timeInSec--;
        this.timerText.text = this.timeInSec;
    }
*/

    update(){
        
        //Updating timer 
        this.timerText.text = this.clock.getRemainingSeconds();//this.timeInSec - this.clock.getElapsedSeconds();
        //console.log(game.settings.spaceShipSpeed);
        //console.log("GHello");
        
        if(this.clock.getElapsedSeconds() >= 30 && !this.speedFlag){
            this.speedFlag = true;
            //console.log(this.clock.getElapsedSeconds())
            //console.log("HHello");
            this.ship01.moveSpeed +=3;               // update spaceships (x3)
            this.ship02.moveSpeed++;
            this.ship03.moveSpeed += 2;
            game.settings.spaceShipSpeed = 10;
        }
        //var fCounter = 0;
        //this.fCounter++;


        /*
        if(!this.gameOver && (this.fCounter % 60 == 0)){
            this.fCounter = 0;
            this.timeInSec--;
            this.timer.text = this.timeInSec;
        }
        */
        

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){  
            this.p1Rocket.update();
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }
        
      

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);

            var rt = this.clock.getRemaining();
            this.clock.delay += 10000;
            //this.clock.addEvent({
                //delay: rt + 10000});
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            var rt = this.clock.getRemaining();
            this.clock.delay += 10000;
            //this.clock.addEvent({
                //delay: rt + 10000});
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            var rt = this.clock.getRemaining();
            this.clock.delay += 10000;
            //this.clock.addEvent({
                //delay: rt + 10000});
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
          }

    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
      }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        
        if(this.p1Score > this.highScore){
            this.highScore = this.p1Score;
            this.scoreRight.text = this.highScore;
        }
        
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');         
      }  
}