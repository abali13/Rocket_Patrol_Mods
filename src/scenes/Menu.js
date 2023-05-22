class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.image('starfield', './assets/starfield2.png');
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('music', './assets/rocket_mods_music.mp3');
      }
    create(){
      let backgroundMusic = this.sound.add('music');
      backgroundMusic.loop = true;
      backgroundMusic.play();

      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '48px',
            backgroundColor: '#0AA9EE'/*'#F3B141'*/,
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menuConfig1 = {
          fontFamily: 'Georgia',
          fontSize: '24px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }

        //menu text
        this.add.text(game.config.width / 2, game.config.height / 5 - borderPadding - borderUISize, 'ROCKET PATROL, MODDED', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/ 4, 'USE mouse pointer to control rocket and click to fire', menuConfig1).setOrigin(0.5);
        menuConfig.backgroundColor = '#0AA9EE'/*'#F0FF00'*/;
        menuConfig.color = '#000';
        menuConfig.fontSize = '28px';
        this.add.text(game.config.width/2, game.config.height/3 /*borderUISize + borderPadding*/, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        //menuConfig1.fontSize = 'px'
        this.add.text(game.config.width/2, game.config.height/2, 'Music Credits:https://tunetank.com/track/1585-space/', menuConfig1).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    
    update(){
      this.starfield.tilePositionX -= 4;
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
    }
}