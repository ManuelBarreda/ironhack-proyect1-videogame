class Obstacle {
    constructor(ctx, canvasWidth, canvasHeight, color) {
        this.ctx = ctx
        this.obsSize = {
            w: 20,
            h: 20
        }
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.obsPos = {
            x: undefined,   //Redefinir para que salgan de todas partes
            y: undefined,
        }
        this.obsVel = {
            x: 10,
            y: 10
        }
        this.color = color
    }

    drawObs() {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.obsPos.x, this.obsPos.y, this.obsSize.w, this.obsSize.h)
        this.moveObs()
    }

    moveObs() {
        this.obsPos.x += this.obsVel.x
        this.obsPos.y += this.obsVel.y
    }
    
    destroyObs() {
        //Completar función destrucción obstaculo con colisión de balas
    }
}