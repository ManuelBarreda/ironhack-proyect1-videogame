class Player {
    constructor(ctx, canvasWidth, canvasHeight, keys) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        };
        this.playerSize = {
            w: 100,
            h: 100
        };
        this.playerPos = {
            w: this.canvasSize.w / 2 - (this.playerSize.w / 2),
            h: this.canvasSize.h / 2 - (this.playerSize.h / 2)
        };
        this.playerInstance = new Image();
        this.playerInstance.src = "./img/player.png";
        this.keys = keys;
        this.bullets = [];

        this.eventListeners();
    }

    drawPlayer() {
        this.ctx.drawImage(this.playerInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(b => b.draw())
        this.clearBullets()
    }

    shoot() {
        //constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, color)
        this.bullets.push(new Bullet(this.ctx, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h, 'black'))
    }

    clearBullets() {
        this.bullets = this.bullets.filter(//Bullets inside screen)
    }

    eventListeners() {
        document.addEventListener("keydown", e => {
            //INSERT KEYS AND MOVEMENTS
        })
    }
}