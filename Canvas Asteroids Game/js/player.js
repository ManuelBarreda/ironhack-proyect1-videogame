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
        this.image = new Image();
        this.image.src = "./img/player.png";
        this.keys = keys;
        this.bullets = [];

    }    
}