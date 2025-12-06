import Player from "./Player.js";
import Ground from "./Ground.js"; 
import HydrantController from "./HydrantController.js";
import Sky from "./Sky.js";

//From what I can gather so far, if I need to make a game loop for a litle
//game I would probably do that here.

// For the assignment I will use input from the dummy form to make 
//a dummy object
console.log("Hello World from gameloop.js");

let dummyForm = document.getElementById("dummyForm")
dummyForm.addEventListener('submit', dummy)

function dummy(e){
    e.preventDefault()

    const dummy = {
    dummyinput: document.getElementById("dummyInput"),
    
    }

    console.log(dummy)
}



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameSpeedStart = 0.25;
const gameSpeedIncrement = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const Player_Width = 68;
const Player_Height = 68;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 200;
const GROUND_HEIGHT = 200;
const GROUND_AND_HYDRANT_SPEED = 0.5;
const SKY_WIDTH = 200;
const SKY_HEIGHT = 200;
const SKY_SPEED = 0.1;

const HYDRANT_CONFIG = [{width: 34/1.5, height:  34/1.5, image: "./Images/Sprites/Fire Hydrant.png"}];


//game objects
let player = null;

let scaleRatio = null;
let previousTime = null;
let sky = null;
let ground = null;
let gameSpeed = gameSpeedStart;
let hydrantController = null;
let gameOver = false;
let hasAddedEventListenerForRestart = false;

function createSprites(){
    const playerWidthInGAME = Player_Width * scaleRatio;
    const playerHeightInGAME = Player_Height * scaleRatio;
    const minJumpHeightInGAME = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGAME = MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGAME = GROUND_WIDTH * scaleRatio;
    const groundHeightInGAME = GROUND_HEIGHT * scaleRatio;

    const skyWidthInGAME = SKY_WIDTH * scaleRatio;
    const skyHeightInGAME = SKY_HEIGHT * scaleRatio;

    
    sky = new Sky(
        ctx,
        skyWidthInGAME,
        skyHeightInGAME,
        SKY_SPEED,
        scaleRatio
    )


    player = new Player(
        ctx,
        playerWidthInGAME,
        playerHeightInGAME,
        minJumpHeightInGAME,
        maxJumpHeightInGAME,
        scaleRatio
    );


    ground = new Ground(ctx, groundWidthInGAME, groundHeightInGAME, GROUND_AND_HYDRANT_SPEED, scaleRatio);

    const hydrantImages = HYDRANT_CONFIG.map(hydrant =>{
        const image = new Image();
        image.src = hydrant.image;
        return {
            image: image,
            width: hydrant.width * scaleRatio,
            height: hydrant.height * scaleRatio
        };
    });

    hydrantController = new HydrantController(
        ctx,
        hydrantImages,
        scaleRatio,
        GROUND_AND_HYDRANT_SPEED
    )
}

function setScreen(){
    scaleRatio = getScaleRatio()
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
}

setScreen();

window.addEventListener('resize',()=>setTimeout( setScreen,500));

if(screen.orientation){
    screen.orientation.addEventListener('change',()=>setTimeout( setScreen,500));
}

function getScaleRatio(){
    const screenHeight = Math.min(
        window.innerHeight, document.documentElement.clientHeight
    );


const screenWidth = Math.min(
    window.innerWidth, document.documentElement.clientWidth
);

//window
if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT){
    return screenWidth / GAME_WIDTH;
}
else{
    return screenHeight / GAME_HEIGHT;
}}

//game loop
function showGameOver(){
     const fontSize = 70 * scaleRatio;
  ctx.font = `${fontSize}px 'Segoe UI'`;
  ctx.fillStyle = "black";
  const x = canvas.width / 4.5;
  const y = canvas.height / 2;
  ctx.fillText("GAME OVER", x, y); 
}
function setUpGameReset(){
    if(!hasAddedEventListenerForRestart){
        hasAddedEventListenerForRestart = true;

        setTimeout(() =>{

        window.addEventListener("keyup", reset, {once:true});
        window.addEventListener("keyup", reset, {once:true});
    } ,1000);
}
}

function reset(){
    hasAddedEventListenerForRestart = false;
    gameOver = false;
    ground.reset();
    sky.reset();
    hydrantController.reset();
    gameSpeed = gameSpeedStart;
}

function clearScreen(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function gameLoop(currentTime){
    if(previousTime === null){
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    //console.log(`Frame Time Delta: ${frameTimeDelta} ms`);


    clearScreen();

    if(!gameOver){
    //update game objects
    sky.update(gameSpeed,frameTimeDelta);
    ground.update(gameSpeed,frameTimeDelta);
    hydrantController.update(gameSpeed,frameTimeDelta);
    player.update(gameSpeed,frameTimeDelta);
    }

    if(!gameOver&& hydrantController.collideWith(player)){
        gameOver = true;
        setUpGameReset();
    }
    //draw game objects
    
    sky.draw();
    ground.draw();
    hydrantController.draw();
    player.draw();

    if(gameOver){
        showGameOver();
    }




    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);



