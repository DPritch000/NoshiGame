export default class Hydrant{
    constructor(ctx, x, y, width, height, image){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    update(speed, gameSpeed, FrameTimeDelta, scaleRatio){
        this.x -= speed * gameSpeed * FrameTimeDelta * scaleRatio;
    }
    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    collideWith(sprite){
        const adjustBy = 2;
        if(sprite.x < this.x + this.width/adjustBy &&
           sprite.x + sprite.width/adjustBy > this.x &&
           sprite.y < this.y + this.height/adjustBy &&
           sprite.y + sprite.height/adjustBy > this.y){
            return true;
        }
        else{
            return false;
        }
    }
}