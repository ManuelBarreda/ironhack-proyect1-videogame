class Obstacle {
    constructor(ctx, canvasWidth, canvasHeight, positionX, positionY, direction) {
        this.ctx = ctx
        this.obsSize = {
            w: 40,
            h: 40
        }
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.obsPos = {
            // x: this.canvasSize.w / 2 - this.obsSize.w/2,
            // y: 0,
            x: positionX,
            y: positionY
        }
            
        this.obsVel = {
            x: 5,
            y: 5
        }

        this.image = new Image();
        this.image.src = "./img/vegeta-shot-ball.png"
        this.origin = direction

    }

    drawObs() {
        // this.ctx.fillStyle = this.color
        // this.ctx.fillRect(this.obsPos.x, this.obsPos.y, this.obsSize.w, this.obsSize.h)

        this.ctx.drawImage(this.image, this.obsPos.x, this.obsPos.y, this.obsSize.w, this.obsSize.h);
        this.moveObs()
    }

    moveObs() {
         switch (this.origin) {
            case 'top':
                this.obsPos.y += this.obsVel.y
                break;
            case 'left':
                this.obsPos.x += this.obsVel.x
                break;
            case 'down':
                this.obsPos.y -= this.obsVel.y
                break;
            case 'right':
                this.obsPos.x -= this.obsVel.x
                break;
        }
    }
}
