class Player {
    constructor(ctx, canvasWidth, canvasHeight, keys, points) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        };
        this.playerSize = {
            w: 802*0.1,
            h: 979*0.1
        };
        this.playerPos = {
            x: this.canvasSize.w / 2 - (this.playerSize.w / 2),
            y: this.canvasSize.h / 2 - (this.playerSize.h / 2)
        };
        this.playerImage = new Image();
        this.playerImage.src =  "./img/toppng.com-dragon-ball-nimbus-cloud-goku-en-su-nube-voladora-802x979.png"
        this.keys = keys;
        this.bullets = [];
        this.score = points;
        this.shootDir = "top"

        this.eventListeners();
    }

    drawPlayer() {
        this.ctx.drawImage(this.playerImage, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        // this.ctx.fillStyle = 'black'
        // this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(b => b.drawBullet())

        this.clearBullets()
    }

    shoot() {
        // this.score++  -> Lo he usado para comprobar que this.score va aumentando, falta loggearlo en el HTML de "Your score"
        // console.log(this.score, typeof(this.score))
        this.bullets.push(new Bullet(this.ctx, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h, this.shootDir))  //constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, color)
    }

    clearBullets() {
        this.bullets = this.bullets.filter(b => (b.bulletPos.x > 0 && b.bulletPos.x < this.canvasSize.w) && (b.bulletPos.y > 0 && b.bulletPos.y < this.canvasSize.h))
    }

    eventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.key) {
                case this.keys.keySpace:
                    this.shoot();
                    break;
                case this.keys.keyW:
                    this.shootDir = 'top';
                    break;
                case this.keys.keyA:
                    this.shootDir = 'left';
                    break;
                case this.keys.keyS:
                    this.shootDir = 'down';
                    break;
                case this.keys.keyD:
                    this.shootDir = 'right';
                    break;
            }
        });
    }
}