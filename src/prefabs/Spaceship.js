// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;;
    }

    update(){
        //move spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
        //if(this.clock.getElapsedSeconds() == 3){
            //this.moveSpeed += 5;               // update spaceships (x3)
            //this.ship02.moveSpeed += 5;
            //this.ship03.moveSpeed += 5;
        //}
    }

    //reset position
    reset(){
        this.x = game.config.width;
    }
}
