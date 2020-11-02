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
            x: 10,
            y: 10
        }
        this.radius = 5;
        this.shootDir = shootDir
    }

    drawBullet() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "black"
        this.ctx.arc(this.bulletPos.x, this.bulletPos.y, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
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