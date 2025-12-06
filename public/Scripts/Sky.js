export default class Sky{
    constructor(ctx, width, height,speed, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.scaleRatio = scaleRatio;
        this.speed = speed;


        this.x = 0;
        this.y = 0;

        this.skyImage = new Image();
        this.skyImage.src = "./Images/Sprites/Clouds.png";
        
    }
    draw(){
        this.ctx.drawImage(this.skyImage, this.x, this.y, this.width, this.height);
         this.ctx.drawImage(this.skyImage, this.x + this.width, this.y, this.width, this.height);
         this.ctx.drawImage(this.skyImage, this.x + (2*this.width), this.y, this.width, this.height);
         this.ctx.drawImage(this.skyImage, this.x + (3*this.width), this.y, this.width, this.height);
        this.ctx.drawImage(this.skyImage, this.x + (4*this.width), this.y, this.width, this.height);


         if(this.x< -this.width){
            this.x = 0;
         }
    }
     update(gameSpeed,FrameTimeDelta){
        this.x -= gameSpeed*FrameTimeDelta* this.speed* this.scaleRatio;
    }
    restet(){
        this.x = 0;
    }
}