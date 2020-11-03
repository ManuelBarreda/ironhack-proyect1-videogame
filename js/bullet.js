class Bullet {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, shootDir) {
        this.ctx = ctx
        this.bulletPos = {
            x: playerPosX + (playerWidth / 2),
            y: playerPosY + (playerHeight / 2)
        }
        this.playerPos = {
            x: playerPosX,
            y: playerPosY
        }
        this.playerSize = {
            w: playerWidth,
            h: playerHeight
        }
        this.bulletVel = {
            x: 7,
            y: 7
        }
        this.bulletSize = {
            w: 20,
            h: 20
        }
        this.radius = 5;
        this.shootDir = shootDir
        this.image = new Image();
        this.image.src = "./img/goku-shot-ball.png"
    }

    drawBullet() {
        //this.ctx.beginPath()
        // this.ctx.fillStyle = "black"
        // this.ctx.fillRect(this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
        //this.ctx.arc(this.bulletPos.x, this.bulletPos.y, this.radius, 0, Math.PI * 2)
        //this.ctx.fill()
        //this.ctx.closePath()

        this.ctx.drawImage(this.image, (this.bulletPos.x - this.bulletSize.w / 2), (this.bulletPos.y - this.bulletSize.h / 2), this.bulletSize.w, this.bulletSize.h);
        this.moveBullet()
    }

    moveBullet() {
        switch (this.shootDir) {
            case 'top':
                this.bulletPos.y -= this.bulletVel.y
                break;
            case 'left':
                this.bulletPos.x -= this.bulletVel.x
                break;
            case 'down':
                this.bulletPos.y += this.bulletVel.y
                break;
            case 'right':
                this.bulletPos.x += this.bulletVel.x
                break;
        }
    }
}