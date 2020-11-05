
    //  BLUE BOB - EXTRA //
class BlueBob {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.bobPos = {
            x: 0,
            y: canvasHeight*(1/6)-this.bobSize.h/2
        }
        this.bobSize = {
            w: 50,
            h: 50
        }
        this.bobVel = {
            x: 10,
            y: 10
        }
        this.bobImage = new Image();
        this.bobImage.src = "./img/ghostbob-blue.png"
        this.bobImage.frames = 4;
        this.bobImage.framesIndex = 3;
    }

    drawBob(frames) {
        this.ctx.drawImage(this.bobImage,
            this.bobImage.framesIndex * Math.floor(this.bobImage.width / this.bobImage.frames),
            0,
            Math.floor(this.bobImage.width / this.bobImage.frames),
            this.bobImage.height,
            this.bobPos.x,
            this.bobPos.y,
            this.bobSize.w,
            this.bobSize.h);
        this.animateBob(frames)
        this.moveBob()

    }

    moveBob() {
        this.bobPos.x += this.bobVel.x
    }

    animateBob(frames) {
        if (frames % 6 == 0) {
        this.bobImage.framesIndex++;
        }
        if (this.bobImage.framesIndex > this.bobImage.frames - 1) {
        this.bobImage.framesIndex = 0;
        }
    }
}

    //  RED BOB - EXTRA //
class RedBob {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.bobSize = {
            w: 50,
            h: 50
        }
        this.bobPos = {
            x: 0,
            y: canvasHeight*(2/3)-this.bobSize.h/2
        }
        this.bobVel = {
            x: 10,
            y: 10
        }
        this.bobImage = new Image();
        this.bobImage.src = "./img/ghostbob-red.png"
        this.bobImage.frames = 4;
        this.bobImage.framesIndex = 3;
    }

    drawBob(frames) {
        this.ctx.drawImage(this.bobImage,
            this.bobImage.framesIndex * Math.floor(this.bobImage.width / this.bobImage.frames),
            0,
            Math.floor(this.bobImage.width / this.bobImage.frames),
            this.bobImage.height,
            this.bobPos.x,
            this.bobPos.y,
            this.bobSize.w,
            this.bobSize.h);
        this.animateBob(frames)
        this.moveBob()

    }

    moveBob() {
        this.bobPos.x += this.bobVel.x
    }

    animateBob(frames) {
        if (frames % 6 == 0) {
        this.bobImage.framesIndex++;
        }
        if (this.bobImage.framesIndex > this.bobImage.frames - 1) {
        this.bobImage.framesIndex = 0;
        }
    }
}

    //  GREEN BOB - EXTRA //
class GreenBob {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.bobSize = {
            w: 50,
            h: 50
        }
        this.bobPos = {
            x: canvasWidth,
            y: canvasHeight*(5/6)-this.bobSize.h/2
        }
        this.bobVel = {
            x: 10,
            y: 10
        }
        this.bobImage = new Image();
        this.bobImage.src = "./img/ghostbob-green (1).png"
        this.bobImage.frames = 4;
        this.bobImage.framesIndex = 3;
    }

    drawBob(frames) {
        this.ctx.drawImage(this.bobImage,
            this.bobImage.framesIndex * Math.floor(this.bobImage.width / this.bobImage.frames),
            0,
            Math.floor(this.bobImage.width / this.bobImage.frames),
            this.bobImage.height,
            this.bobPos.x,
            this.bobPos.y,
            this.bobSize.w,
            this.bobSize.h);
        this.animateBob(frames)
        this.moveBob()
    }

    moveBob() {
         this.bobPos.x -= this.bobVel.x
    }

    animateBob(frames) {
        if (frames % 6 == 0) {
        this.bobImage.framesIndex++;
        }
        if (this.bobImage.framesIndex > this.bobImage.frames - 1) {
        this.bobImage.framesIndex = 0;
        }
    }
}

    //  YELLOW BOB - EXTRA //
class YellowBob {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        }
        this.bobSize = {
            w: 50,
            h: 50
        }
        this.bobPos = {
            x: canvasWidth,
            y: canvasHeight*(1/3)-this.bobSize.h/2
        } 
        this.bobVel = {
            x: 10,
            y: 10
        }
        this.bobImage = new Image();
        this.bobImage.src = "./img/ghostbob-yellow (1).png"
        this.bobImage.frames = 4;
        this.bobImage.framesIndex = 3;
    }

    drawBob(frames) {
        this.ctx.drawImage(this.bobImage,
            this.bobImage.framesIndex * Math.floor(this.bobImage.width / this.bobImage.frames),
            0,
            Math.floor(this.bobImage.width / this.bobImage.frames),
            this.bobImage.height,
            this.bobPos.x,
            this.bobPos.y,
            this.bobSize.w,
            this.bobSize.h);
        this.animateBob(frames)
        this.moveBob()
    }

    moveBob() {
         this.bobPos.x -= this.bobVel.x
    }

    animateBob(frames) {
        if (frames % 6 == 0) {
        this.bobImage.framesIndex++;
        }
        if (this.bobImage.framesIndex > this.bobImage.frames - 1) {
        this.bobImage.framesIndex = 0;
        }
    }
}