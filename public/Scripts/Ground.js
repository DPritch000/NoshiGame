export default class Ground{
    constructor(ctx, width, height,speed, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height/5;
        this.scaleRatio = scaleRatio;
        this.speed = speed;


        this.x = 0;
        this.y = 178 * scaleRatio;

        this.groundImage = new Image();
        this.groundImage.src = "./Images/Sprites/ground1.png";
        
    }
    draw(){
        this.ctx.drawImage(this.groundImage, this.x, this.y, this.width, this.height);
         this.ctx.drawImage(this.groundImage, this.x + this.width, this.y, this.width, this.height);
         this.ctx.drawImage(this.groundImage, this.x + (2*this.width), this.y, this.width, this.height);
         this.ctx.drawImage(this.groundImage, this.x + (3*this.width), this.y, this.width, this.height);
        this.ctx.drawImage(this.groundImage, this.x + (4*this.width), this.y, this.width, this.height);


         if(this.x< -this.width){
            this.x = 0;
         }
    }
     update(gameSpeed,FrameTimeDelta){
        this.x -= gameSpeed*FrameTimeDelta* this.speed* this.scaleRatio;
    }
    reset(){
        this.x = 0;
    }
}