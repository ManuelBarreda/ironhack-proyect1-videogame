class Bullet {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, shootDir, bulletRemove, gameSpeed) {
        this.ctx = ctx
        this.playerPos = {
            x: playerPosX,
            y: playerPosY
        }
        this.playerSize = {
            w: playerWidth,
            h: playerHeight
        }
        this.bulletPos = {
            x: playerPosX + (playerWidth / 2),
            y: playerPosY + (playerHeight / 2)
        }
        this.bulletSize = {
            w: 30,
            h: 30
        }
        this.bulletVel = {
            x: 7+gameSpeed,
            y: 7+gameSpeed
        }
        this.shootDir = shootDir
        this.image = new Image();
        this.image.src = "./img/goku-shot-ball.png"
        this.bulletRemove = bulletRemove
    }

    drawBullet() {
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