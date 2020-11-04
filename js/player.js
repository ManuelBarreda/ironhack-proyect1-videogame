class Player {
    constructor(ctx, canvasWidth, canvasHeight, keys, points,) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        };
        this.playerSize = {
            w: 120,
            h: 120
        };
        this.playerPos = {
            x: this.canvasSize.w / 2 - (this.playerSize.w / 2),
            y: this.canvasSize.h / 2 - (this.playerSize.h / 2)
        };
        this.playerImage = new Image();
        this.playerImage.src = "./img/goku-kid-nimbus-sprite.png"
        this.playerImage.frames = 4;
        this.playerImage.framesIndex = 1;
        this.keys = keys;
        this.gameSpeed = 0;
        this.bullets = [];
        this.bulletRemove = false;
        this.score = points;
        this.shootDir = "down"
        this.shootSound = new Sound("./audio/ball-dragon-gt-jump.mp3");
        this.eventListeners();
        this.speedInterval = setInterval(() => {
            this.gameSpeed++
        }, 5000)
    }

    drawPlayer() {
        this.bullets.forEach(b => b.drawBullet())
        this.clearBullets()

        this.ctx.drawImage(this.playerImage,
            this.playerImage.framesIndex * Math.floor(this.playerImage.width / this.playerImage.frames),
            0,
            Math.floor(this.playerImage.width / this.playerImage.frames),
            this.playerImage.height,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h)

        this.animate()
    }

    animate() {
        switch (this.shootDir) {
            case 'top':
                this.playerImage.framesIndex = 3;
                break;
            case 'left':
                this.playerImage.framesIndex = 0;
                break;
            case 'down':
                this.playerImage.framesIndex = 1;
                break;
            case 'right':
                this.playerImage.framesIndex = 2;
                break;
        }
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h, this.shootDir, this.bulletRemove, this.gameSpeed))
        this.shootSound.play()
    }

    clearBullets() {
        this.bullets = this.bullets.filter(b => (b.bulletPos.x > 0 && b.bulletPos.x < this.canvasSize.w) && (b.bulletPos.y > 0 && b.bulletPos.y < this.canvasSize.h))
    }

    eventListeners() {
        document.addEventListener("keyup", e => {
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