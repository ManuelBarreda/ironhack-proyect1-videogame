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
    bullets: [],
    score: undefined,

    init(id) {
        this.canvasTag = document.getElementById(id);
        this.ctx = this.canvasTag.getContext('2d');
        this.setDimensions();
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h)    //constructor(ctx, bgWidth, bgHeight)
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

            this.generateObstacle()

            this.isCollision() ? this.gameOver() : null     //REVISAR FUNCIONAMIENTO

        if (this.isTarget()) {                                  //REVISAR VALIDEZ
                this.obstacles.forEach(obs => obs.destroyObs())
                this.score++
            }

        }, this.FPS)    //ESTO NECESITO QUE ME LO EXPLIQUEN
    },

    reset() {
        this.obstacles = []
        this.bullets = []
        this.score = 0
        this.player = new Player(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys, this.score) //constructor(ctx, canvasWidth, canvasHeight, keys)
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
        if (this.framesCounter % 90 === 0) {
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, 'black'))      // constructor(ctx, canvasWidth, canvasHeight, color) {
        }
    },

    clearObstacles() {
        //this.obstacles = this.obstacles.filter(obs => obs.obsPos.x)
        //Si los obstáculos se quedan dentro de la pantalla los eliminamos con colisiones??
    },

    isCollision() {
        //  COLISIONES obstaculo + jugador = game over()
        //return some(obs => {
            //return ()
            //this.player.posX + this.player.width >= obs.posX &&
            //this.player.posY + this.player.height >= obs.posY &&
            //this.player.posX <= obs.posX + obs.width
        //})
    },

    isTarget() {
        //  COLISIONES balas + obstaculos = destroyObs() && score++
    },

    gameOver() {
        //HOW TO? Mensaje de Game over, log current score to top scores

        clearInterval(this.interval)
    },
};