
    //  OBSTACLE - BALL //
class Obstacle {
    constructor(ctx, canvasWidth, canvasHeight, positionX, positionY, direction, obsRemove, gameSpeed) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.obsSize = {
            w: 50,
            h: 50
        }
        this.obsPos = {
            x: positionX-this.obsSize.w/2,
            y: positionY-this.obsSize.h/2
        }
        this.obsVel = {
            x: 2+gameSpeed,
            y: 2+gameSpeed
        }
        this.image = new Image();
        this.image.src = "./img/vegeta-shot-ball.png"
        this.origin = direction;
        this.gameSpeed = gameSpeed;
        this.obsRemove = obsRemove;

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


    //  ENEMY - VEGETA //
class Vegeta {
    constructor(ctx, canvasWidth, canvasHeight, positionX, positionY, direction, obsRemove, gameSpeed) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.vgtSize = {
            w: 120,
            h: 120
        }
        this.vgtPos = {
            x: positionX-this.vgtSize.w/2,
            y: positionY-this.vgtSize.h/2
        }
        this.vgtVel = {
            x: 6+gameSpeed,
            y: 6+gameSpeed
        }

        // Image
        this.vegetaImage = new Image();
        this.vegetaImage.src = "./img/enemy-vegeta-sprite.png"
        this.vegetaImage.frames = 4;
        this.vegetaImage.framesIndex = 3;

        // Movement
        this.origin = direction;
        this.gameSpeed = gameSpeed;
        this.obsRemove = obsRemove;
    }

    drawVgt() {
        this.animateVgt()
        this.ctx.drawImage(this.vegetaImage,
            this.vegetaImage.framesIndex * Math.floor(this.vegetaImage.width / this.vegetaImage.frames),
            0,
            Math.floor(this.vegetaImage.width / this.vegetaImage.frames),
            this.vegetaImage.height,
            this.vgtPos.x,
            this.vgtPos.y,
            this.vgtSize.w,
            this.vgtSize.h);
        this.moveVgt()
    }

    moveVgt() {
         switch (this.origin) {
            case 'top':
                this.vgtPos.y += this.vgtVel.y
                break;
            case 'left':
                this.vgtPos.x += this.vgtVel.x
                break;
            case 'down':
                this.vgtPos.y -= this.vgtVel.y
                break;
            case 'right':
                this.vgtPos.x -= this.vgtVel.x
                break;
        }
    }

    animateVgt() {
        switch (this.origin) {
            case 'top':
                this.vegetaImage.framesIndex = 3;
                break;
            case 'left':
                this.vegetaImage.framesIndex = 0;
                break;
            case 'down':
                this.vegetaImage.framesIndex = 1;
                break;
            case 'right':
                this.vegetaImage.framesIndex = 2;
                break;
        }
    }
}


    //  ENEMY - PICCOLO //
class Piccolo {
    constructor(ctx, canvasWidth, canvasHeight, positionX, positionY, direction, obsRemove, gameSpeed) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.pclSize = {
            w: 150,
            h: 150
        }
        this.pclPos = {
            x: positionX-this.pclSize.w/2,
            y: positionY-this.pclSize.h/2
        }
        this.pclVel = {
            x: 4+gameSpeed,
            y: 4+gameSpeed
        }

        // Image
        this.piccoloImage = new Image();
        this.piccoloImage.src = "./img/enemy-piccolo-sprite.png"
        this.piccoloImage.frames = 4;
        this.piccoloImage.framesIndex = 1;

        // Movement
        this.origin = direction;
        this.gameSpeed = gameSpeed;
        this.obsRemove = obsRemove;
    }

    drawPcl() {
        this.animatePcl()
        this.ctx.drawImage(this.piccoloImage,
            this.piccoloImage.framesIndex * Math.floor(this.piccoloImage.width / this.piccoloImage.frames),
            0,
            Math.floor(this.piccoloImage.width / this.piccoloImage.frames),
            this.piccoloImage.height,
            this.pclPos.x,
            this.pclPos.y,
            this.pclSize.w,
            this.pclSize.h);
        this.movePcl()

    }

    movePcl() {
         switch (this.origin) {
            case 'top':
                this.pclPos.y += this.pclVel.y
                break;
            case 'left':
                this.pclPos.x += this.pclVel.x
                break;
            case 'down':
                this.pclPos.y -= this.pclVel.y
                break;
            case 'right':
                this.pclPos.x -= this.pclVel.x
                break;
        }
    }

    animatePcl() {
        switch (this.origin) {
            case 'top':
                this.piccoloImage.framesIndex = 1;
                break;
            case 'left':
                this.piccoloImage.framesIndex = 0;
                break;
            case 'down':
                this.piccoloImage.framesIndex = 3;
                break;
            case 'right':
                this.piccoloImage.framesIndex = 2;
                break;
        }
    }
}