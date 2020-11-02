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
        this.originsArray = ["top", "left", "down", "right"]
        this.origin = undefined

    }

    randomOrigin() {
        let i = Math.random()*(this.originsArray.length - 0) + 0
        this.origin = this.originsArray[i]
    }

    drawObs() {
        this.randomOrigin
        switch (this.origin) {
            case "top":
                this.obsPos.x = this.canvasSize.w / 2
                this.obsPos.y = 0
                break;
            case "left":
                this.obsPos.x = 0
                this.obsPos.y = this.canvasSize.h / 2
                break;
            case "down":
                this.obsPos.x = this.canvasSize.w / 2
                this.obsPos.y = this.canvasSize.h
                break;
            case "top":
                this.obsPos.x = this.canvasSize.w
                this.obsPos.y = this.canvasSize.h / 2
                break;
        }
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.obsPos.x, this.obsPos.y, this.obsSize.w, this.obsSize.h)
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
    
    destroyObs() {
        //Completar función destrucción obstaculo con colisión de balas
    }
}