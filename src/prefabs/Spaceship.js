// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        let i = Phaser.Math.Between(1, 100);
        if(i % 2 == 0){
            this.moveSpeed = game.settings.spaceshipSpeed;
        }
        else{
            this.moveSpeed = -(game.settings.spaceshipSpeed);
        }
        
    }

    update(){
        //move spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.moveSpeed > 0 && this.x <= 0 - this.width){
            this.reset();
            //this.moveSpeed = -(this.moveSpeed);
        }else if(this.moveSpeed < 0 && this.x > game.config.width + this.width){
            this.x = -this.width;
        }

    }

    //reset position
    reset(){
        //if(this.moveSpeed > 0){
            this.x = game.config.width;
        //}else{
            //this.x = 0;
        //}
        
    }
}
