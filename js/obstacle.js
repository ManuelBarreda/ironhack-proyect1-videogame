class Obstacle {
    constructor(ctx, canvasWidth, canvasHeight, positionX, positionY, direction, obsRemove) {
        this.ctx = ctx
        this.obsSize = {
            w: 50,
            h: 50
        }
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.obsPos = {
            x: positionX-this.obsSize.w/2,
            y: positionY-this.obsSize.h/2
        }
            
        this.obsVel = {
            x: 10,
            y: 10
        }

        this.image = new Image();
        this.image.src = "./img/vegeta-shot-ball.png"
        this.origin = direction;
        this.obsRemove = obsRemove

    }

    drawObs() {

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
