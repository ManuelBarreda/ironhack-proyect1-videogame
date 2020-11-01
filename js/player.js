class Player {
    constructor(ctx, canvasWidth, canvasHeight, keys, points) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasWidth,
            h: canvasHeight
        };
        this.playerSize = {
            w: 100,
            h: 100
        };
        this.playerPos = {
            w: this.canvasSize.w / 2 - (this.playerSize.w / 2),
            h: this.canvasSize.h / 2 - (this.playerSize.h / 2)
        };
        this.playerInstance = new Image();
        this.playerInstance.src = "/img/bugatti.png";
        this.keys = keys;
        this.bullets = [];
        this.score = points

        this.eventListeners();
    }

    drawPlayer() {
        //this.ctx.drawImage(this.playerInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.playerPos.w, this.playerPos.h, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(b => b.drawBullet())
        this.clearBullets()
    }

    shoot() {
        // this.score++  -> Lo he usado para comprobar que this.score va aumentando, falta loggearlo en el HTML de "Your score"
        // console.log(this.score, typeof(this.score))
        this.bullets.push(new Bullet(this.ctx, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h, 'black'))  //constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, color)
    }

    aim(dir) {
        //apuntar el disparo!!!! dir = direction
        // switch dir {
        //     case 'top':
        //         //instructions here
        //         break;
        //     case 'left':
        //         //instructions here
        //         break;
        //     case 'down':
        //         //instructions here
        //         break;
        //     case 'right':
        //         //instructions here
        //         break;
        // }
    }

    clearBullets() {
        this.bullets = this.bullets.filter(b => (b.bulletPos.x > 0 || b.bulletPos.x < this.canvasSize.w) && (b.bulletPos.y > 0 || b.bulletPos.y < this.canvasSize.h))
    }

    eventListeners() {
        document.addEventListener("keydown", e => {
            switch (e.key) {
                case this.keys.keySpace:
                    this.shoot();
                    break;
                // case this.keys.keyW:
                //     this.aim('top');
                //     break;
                // case this.keys.keyA:
                //     this.aim('left');
                //     break;
                // case this.keys.keyS:
                //     this.aim('down');
                //     break;
                // case this.keys.keyD:
                //     this.aim('right');
                //     break;
            }
        });
    }
}