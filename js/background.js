class Background {
    constructor(ctx, bgWidth, bgHeight, imgSource) {
        this.ctx = ctx;
        this.bgSize = {
            w: bgWidth,
            h: bgHeight
        };
        this.bgPos = {
            x: 0,
            y: 0
        }

        this.image = new Image();
        this.image.src = imgSource
    }
    
    drawBg() {
        // this.ctx.fillStyle = 'blue'
        // this.ctx.fillRect(this.bgPos.x, this.bgPos.y, this.bgSize.w, this.bgSize.h)
        this.ctx.drawImage(this.image, this.bgPos.x, this.bgPos.y, this.bgSize.w, this.bgSize.h);
    }
};
