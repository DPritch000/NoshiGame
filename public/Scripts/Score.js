import { getCurrentUser } from "./login.js";
import { fetchData } from "./main.js";

export default class Score {
    score = 0;
    HIGH_SCORE_KEY = "highScore";

    constructor(ctx, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
        this.score = 0;
    }

    update(FrameTimeDelta){
        this.score += 0.01 * FrameTimeDelta;
    }

    reset(){
        this.score = 0;
    }

    // --- 1. Update local storage high score for the current user ---
    setLocalHighScore() {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        const key = `${this.HIGH_SCORE_KEY}_${currentUser.user_id}`;
        const highScore = Number(localStorage.getItem(key)) || 0;

        if (this.score > highScore) {
            localStorage.setItem(key, Math.floor(this.score));
        }
    }

    // --- 2. Submit high score to server for the current user ---
    async submitHighScore() {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        const key = `${this.HIGH_SCORE_KEY}_${currentUser.user_id}`;
        const localHighScore = Number(localStorage.getItem(key)) || 0;

        if (localHighScore <= 0) return;
 if (this.score > highScore) {
            localStorage.setItem(key, Math.floor(this.score));
        
        try {
            const result = await fetchData("/lb/score", {
                user_id: currentUser.user_id,
                score: localHighScore
            }, "POST");
            console.log("Score submitted:", result);
        } catch (err) {
            console.error("Error submitting score:", err);
        }
    }}

    draw() {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        const key = `${this.HIGH_SCORE_KEY}_${currentUser.user_id}`;
        const highScore = Number(localStorage.getItem(key)) || 0;
        const y = 20 * this.scaleRatio;
        const fontSize = 20 * this.scaleRatio;
        this.ctx.font = `${fontSize}px 'Segoe UI'`;
        this.ctx.fillStyle = "#2e2d2dff";

        const scoreX = this.canvas.width - 75 * this.scaleRatio;
        const highScoreX = scoreX - 125 * this.scaleRatio;

        const scorePadded = Math.floor(this.score).toString().padStart(6, "0");
        const highScorePadded = highScore.toString().padStart(6, "0");

        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    }
}