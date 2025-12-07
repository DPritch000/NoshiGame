import Hydrant from "./Hydrant.js";

export default class HydrantConrtroller{
    HYDRANT_INTERVAL_MIN = 500;
    HYDRANT_INTERVAL_MAX = 2000

    nextHydrantInterval = null;
    hydrants = [];


    constructor(ctx, hydrantImages, scaleRatio, speed){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.hydrantImages = hydrantImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;
        this.setNextHydrantInterval();
}   
    setNextHydrantInterval(){
        const num = this.getRandomNumber(this.HYDRANT_INTERVAL_MIN, this.HYDRANT_INTERVAL_MAX);
    
        this.nextHydrantInterval = num;
        //console.log("Next Hydrant In: " + this.nextHydrantInterval);
        
    }
    getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min+1) + min);
    }
        update(gameSpeed, FrameTimeDelta){
        //update hydrant positions
        if(this.nextHydrantInterval <=0){
            //create new hydrant
            this.createHydrant();
            this.setNextHydrantInterval();
            
        }
        this.nextHydrantInterval -= FrameTimeDelta;
        
        
        this.hydrants.forEach((hydrant) =>{
            hydrant.update(this.speed,gameSpeed,FrameTimeDelta,this.scaleRatio);

    });

    this.hydrant = this.hydrants.filter((hydrant) => hydrant.x > -hydrant.width);


}
    draw(){
        //draw hydrants
        this.hydrants.forEach((hydrant) =>{
            this.ctx.drawImage(hydrant.image, hydrant.x, hydrant.y, hydrant.width, hydrant.height);
        });
    }
   
    createHydrant(){   
        const index = this.getRandomNumber(0, this.hydrantImages.length -1);
        const hydrantImage = this.hydrantImages[index];
        const x = this.canvas.width*1.5;
        const y = this.canvas.height - hydrantImage.height-(15* this.scaleRatio);
        const hydrant = new Hydrant(
            this.ctx,
            x,
            y,
            hydrantImage.width,
            hydrantImage.height,
            hydrantImage.image,
            
        );
        this.hydrants.push(hydrant);
       
    }
    collideWith(sprite){
     return this.hydrants.some((hydrant) => hydrant.collideWith(sprite));
    } 
    reset(){
        this.hydrants = [];
    }}
 