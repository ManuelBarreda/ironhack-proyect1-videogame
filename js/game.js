const gameApp = {
    name: 'Game app',
    description: 'Game app with Canvas',
    version: '1.0.0',
    license: undefined,
    authors: 'Patricia Muñoz de Dios & Manuel de la Barreda',
    canvasTag: undefined,
    ctx: undefined,
    FPS: 60,
    frames: 0,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    keys: {
        keyW: "w",
        keyA: "a",
        keyS: "s",
        keyD: "d",
        keySpace: " ",
    },
    background: undefined,
    player: undefined,
    obstacles: [],
    score: undefined,

    init(id) {
        this.canvasTag = document.getElementById(id);
        this.ctx = this.canvasTag.getContext('2d');
        this.setDimensions();
        this.background = new Background (this.ctx, this.canvasSize.w, this.canvasSize.h, "./img/dragon-ball-mountains-bg.png")    //constructor(ctx, bgWidth, bgHeight)
        this.background.drawBg()
        this.score = document.getElementById('points')
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth;
        this.canvasSize.h = window.innerHeight;
        this.canvasTag.width = this.canvasSize.w;
        this.canvasTag.height = this.canvasSize.h;
    },

    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.clear()
            this.drawAll()

            this.generateObstacle();
            this.clearObstacles();

            this.frames > 5000 ? this.frames = 0 : this.frames++

            this.isCollision() ? this.gameOver() : null     //REVISAR FUNCIONAMIENTO

            // if (this.isTarget()) {                                  //REVISAR VALIDEZ
            //     this.obstacles.forEach(obs => obs.destroyObs())
            //     this.score++
            // }
            this.isTarget() ? destroyObs() : null
            console.log(this.isTarget())

        }, 1000 / this.FPS)    //ESTO NECESITO QUE ME LO EXPLIQUEN
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./img/dragon-ball-mountains-bg.png");
        this.player = new Player(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys, this.score) //constructor(ctx, canvasWidth, canvasHeight, keys)
        this.obstacles = []
        this.bullets = []
        this.score = 0
    },

    drawAll() {
        this.background.drawBg()
        this.player.drawPlayer()
        this.obstacles.forEach(obs => obs.drawObs())
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    generateObstacle() {
        if (this.frames % 100 === 0) {
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, 'black'))      // constructor(ctx, canvasWidth, canvasHeight, color) {
        }
        //console.log(this.obstacles)
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(b => (b.obsPos.x >= 0 && b.obsPos.x <= this.canvasSize.w) && (b.obsPos.y >= 0 && b.obsPos.y <= this.canvasSize.h))
    },

    isCollision() {
        //  COLISIONES obstaculo + jugador = game over()
        return this.obstacles.some(obs => {
            return (
            this.player.playerPos.x + this.player.playerSize.w >= obs.obsPos.x &&
            this.player.playerPos.y + this.player.playerSize.h >= obs.obsPos.y &&
            this.player.playerPos.x <= obs.obsPos.x + obs.obsSize.w &&
            this.player.playerPos.y <= obs.obsPos.y + obs.obsSize.h
            )
        })
    },

    isTarget() {
        //  COLISIONES balas + obstaculos = destroyObs() && score++
        return this.player.bullets.some(bullet => {
            return this.obstacles.some(obs => {
                if (
                    bullet.bulletPos.x + bullet.bulletSize.w >= obs.obsPos.x &&
                    bullet.bulletPos.y + bullet.bulletSize.h >= obs.obsPos.y &&
                    bullet.bulletPos.x <= obs.obsPos.x + obs.obsSize.w &&
                    bullet.bulletPos.y <= obs.obsPos.y + obs.obsSize.h
                ) {
                    return true
                }
            })
        })
        
    },

    gameOver() {
        //HOW TO? Mensaje de Game over, log current score to top scores

        clearInterval(this.interval)
        alert ("Game Over")
    },
};