const gameApp = {
    name: 'Game app',
    description: 'Game app with Canvas',
    version: '1.0.0',
    license: undefined,
    authors: 'Patricia Muñoz de Dios & Manuel de la Barreda',
    specialThanksTo: 'Germán Álvarez, Enrique Montaño, Gonzalo Argüelles & Hector Carramiñana',
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
    counterScore: 0,
    position: {},
    obsRemove: false,
    gameSpeed: 0,

    init(id) {
        this.canvasTag = document.getElementById(id);
        this.ctx = this.canvasTag.getContext('2d');
        this.setDimensions();
        this.background = new Background (this.ctx, this.canvasSize.w, this.canvasSize.h, "./img/dragon-ball-mountains-bg.png")
        this.background.drawBg()
        
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
            this.bgSound.play()

            this.generateObstacle();

            this.frames > 5000 ? this.frames = 0 : this.frames++

            if (this.isCollision()) {
                this.colSound.play()
                this.gameOver()
            }

            if (this.isTarget()) {
                this.targetSound.play()
                this.destroyObs()
            }
            
            this.drawScore()

        }, 1000 / this.FPS)
        this.speedInterval = setInterval(() => {
            this.gameSpeed++
        }, 5000)
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./img/dragon-ball-mountains-bg.png");
        this.bgSound = new Sound("./audio/Klagmar's Top VGM _783 - Rokko Chan - Lightning Man Stage.mp3");
        this.colSound = new Sound("./audio/NFF-thud.wav")
        this.targetSound = new Sound("./audio/Punch_HD-Mark_DiAngelo-1718986183.mp3")
        this.endSound = new Sound("./audio/dragon-ball.mp3")
        this.player = new Player(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys, this.score, this.gameSpeed)
        this.player.bullets = []
        this.obstacles = []
        this.counterScore = 0

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
        this.randomOrigin()
        if (this.frames % 25 === 0) {
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, this.position.x, this.position.y, this.position.dir, this.obsRemove, this.gameSpeed))
        }
    },

    randomOrigin() {
        let originsArray = ["left", "top", "right", "down"]
        let i = Math.floor(Math.random() * (originsArray.length))
        let origin = originsArray[i]
        this.position = {
            x: this.canvasSize.w / 2,
            y: 0,
            dir: 'top'
            }

        switch (origin) {
            case "top":
                this.position.x = this.canvasSize.w / 2
                this.position.y = 0
                this.position.dir = "top"
                break;
            case "left":
                this.position.x = 0
                this.position.y = this.canvasSize.h / 2
                this.position.dir = "left"
                break;
            case "down":
                this.position.x = this.canvasSize.w / 2
                this.position.y = this.canvasSize.h
                this.position.dir = "down"
                break;
            case "right":
                this.position.x = this.canvasSize.w
                this.position.y = this.canvasSize.h / 2
                this.position.dir = "right"
                break;
        }
        return this.position
    },

    isCollision() {
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
        return this.player.bullets.some(bullet => {
            return this.obstacles.some(obs => {
                if (
                    bullet.bulletPos.x + bullet.bulletSize.w >= obs.obsPos.x &&
                    bullet.bulletPos.y + bullet.bulletSize.h >= obs.obsPos.y &&
                    bullet.bulletPos.x <= obs.obsPos.x + obs.obsSize.w &&
                    bullet.bulletPos.y <= obs.obsPos.y + obs.obsSize.h
                ) {
                    obs.obsRemove = true;
                    bullet.bulletRemove = true;
                    return true
                }
            })
        })   
    },

    destroyObs() {
        this.obstacles = this.obstacles.filter(eachObs => eachObs.obsRemove === false)
        this.player.bullets = this.player.bullets.filter(eachBullet => eachBullet.bulletRemove === false)
        this.counterScore++;
    },

    gameOver() {
        this.bgSound.stop()
        this.endSound.play()
        clearInterval(this.interval)
        clearInterval(this.speedInterval)
        this.drawEndMessage()
        const reload = document.querySelector("#restart-button")
        reload.style.display = "block"
    },

    drawScore() {
        this.ctx.fillStyle = "#2ccaed"
        this.ctx.fillRect(20, 25, 175, 40)
        this.ctx.fillStyle = "white"
        this.ctx.textAlign = "start"
        this.ctx.textBaseline = "middle"
        this.ctx.font = 'bold 16px Courier New'
        this.ctx.fillText("YOUR SCORE: " + this.counterScore, 40, 45)
    },

    drawEndMessage() {

        let interline = 40;

        this.ctx.fillStyle = "#2ccaed"
        this.ctx.fillRect(this.canvasSize.w / 2 - 270, this.canvasSize.h / 2 - 130, 540, 260)
        this.ctx.fillStyle = "white"
        this.ctx.textAlign = "center"
        this.ctx.font = 'bold 50px Courier New'
        this.ctx.textBaseline = "bottom"
        this.ctx.fillText("GAME OVER", this.canvasSize.w / 2, this.canvasSize.h / 2 - interline)
        this.ctx.textBaseline = "middle"
        this.ctx.fillText("Your score is " + this.counterScore, this.canvasSize.w / 2, this.canvasSize.h / 2)
        this.ctx.textBaseline = "top"
        
        if (this.counterScore <= 10) {
            this.ctx.fillText("SERÁS MERLUZO!", this.canvasSize.w / 2, this.canvasSize.h / 2 + interline)
            
        } else if (this.counterScore <= 50) {
            this.ctx.fillText("PONLE SALSOTA!", this.canvasSize.w / 2, this.canvasSize.h / 2 + interline)

        } else if (this.counterScore <= 100) {
            this.ctx.fillText("DALE FUEGOTE!", this.canvasSize.w / 2, this.canvasSize.h / 2 + interline)

        } else if (this.counterScore <= 250) {
            this.ctx.fillText("VAYA FANTASÍA!!!", this.canvasSize.w / 2, this.canvasSize.h / 2 + interline)
        }
    },
};