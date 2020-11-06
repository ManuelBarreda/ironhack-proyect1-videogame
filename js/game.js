const gameApp = {
    name: 'Dragon Ball Fuegote',
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
    extras: [],
    player: undefined,
    obstacles: [],
    vegetas: [],
    piccolos: [],
    gameSpeed: 0,
    counterScore: 0,
    position: {},
    obsRemove: false,


    // --- GAME INIT --- //

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


    // --- START GAME --- //

    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.bgSound.play()
            this.frames > 5000 ? this.frames = 0 : this.frames++
            this.generateObstacle();

            this.isCollision()

            this.isTarget()
            
            this.generateExtra()
            this.clearExtras()
            this.drawScore()

        }, 1000 / this.FPS)

        this.speedInterval = setInterval(() => {
            this.gameSpeed += 0.5
        }, 5000)
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./img/dragon-ball-mountains-bg.png");
        this.bgSound = new Sound("./audio/Klagmar's Top VGM _783 - Rokko Chan - Lightning Man Stage.mp3");
        this.colSound = new Sound("./audio/NFF-thud.wav")
        this.targetSound = new Sound("./audio/Punch_HD-Mark_DiAngelo-1718986183.mp3")
        this.endSound = new Sound("./audio/dragon-ball.mp3")
        this.player = new Player(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys, this.score, this.gameSpeed)
        this.extras = []
        this.player.bullets = []
        this.obstacles = []
        this.vegetas = []
        this.piccolos = []
        this.counterScore = 0
        this.gameSpeed = 0
    },

    drawAll() {
        this.background.drawBg()
        this.extras.forEach(bob => bob.drawBob(this.frames))
        this.player.drawPlayer()
        this.obstacles.forEach(obs => obs.drawObs())
        this.vegetas.forEach(vgt => vgt.drawVgt())
        this.piccolos.forEach(pcl => pcl.drawPcl())
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    // Score

    drawScore() {
        this.ctx.fillStyle = "#2ccaed"
        this.ctx.fillRect(20, 25, 175, 40)
        this.ctx.fillStyle = "white"
        this.ctx.textAlign = "start"
        this.ctx.textBaseline = "middle"
        this.ctx.font = 'bold 16px Courier New'
        this.ctx.fillText("YOUR SCORE: " + this.counterScore, 40, 45)
    },


    // --- RANDOMIZER --- //

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


    // --- OBSTACLES & ENEMIES --- //

    generateObstacle() {
        this.randomOrigin()
        if (this.frames % 25 === 0) {
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, this.position.x, this.position.y, this.position.dir, this.obsRemove, this.gameSpeed))
        }
        if (this.frames % 47 === 0) {
        this.piccolos.push(new Piccolo(this.ctx, this.canvasSize.w, this.canvasSize.h, this.position.x, this.position.y, this.position.dir, this.obsRemove, this.gameSpeed))
        }
        if (this.frames % 93 === 0) {
        this.vegetas.push(new Vegeta(this.ctx, this.canvasSize.w, this.canvasSize.h, this.position.x, this.position.y, this.position.dir, this.obsRemove, this.gameSpeed))
        }
    },

    destroyObs() {
        this.player.bullets = this.player.bullets.filter(eachBullet => eachBullet.bulletRemove === false)
        this.obstacles = this.obstacles.filter(eachObs => eachObs.obsRemove === false)
        this.piccolos = this.piccolos.filter(eachPcl => eachPcl.obsRemove === false)
        this.vegetas = this.vegetas.filter(eachVgt => eachVgt.obsRemove === false)
    },

    // Player - Enemies collisions

    isCollision() {
        this.obstacles.forEach(obs => {
            if (this.player.playerPos.x + this.player.playerSize.w >= obs.obsPos.x &&
                this.player.playerPos.y + this.player.playerSize.h >= obs.obsPos.y &&
                this.player.playerPos.x <= obs.obsPos.x + obs.obsSize.w &&
                this.player.playerPos.y <= obs.obsPos.y + obs.obsSize.h) {
                    this.colSound.play()
                    this.gameOver()
            }
        })
        this.vegetas.forEach(vgt => {
            if (this.player.playerPos.x + this.player.playerSize.w >= vgt.vgtPos.x &&
                this.player.playerPos.y + this.player.playerSize.h >= vgt.vgtPos.y &&
                this.player.playerPos.x <= vgt.vgtPos.x + vgt.vgtSize.w &&
                this.player.playerPos.y <= vgt.vgtPos.y + vgt.vgtSize.h) {
                    this.colSound.play()
                    this.gameOver()
            }
        })
        this.piccolos.forEach(pcl => {
            if (this.player.playerPos.x + this.player.playerSize.w >= pcl.pclPos.x &&
                this.player.playerPos.y + this.player.playerSize.h >= pcl.pclPos.y &&
                this.player.playerPos.x <= pcl.pclPos.x + pcl.pclSize.w &&
                this.player.playerPos.y <= pcl.pclPos.y + pcl.pclSize.h) {
                    this.colSound.play()
                    this.gameOver()
            }
        })
    },

    // Bullets - Enemies collisions

    isTarget() {
        this.player.bullets.forEach(bullet => {
            this.obstacles.forEach(obs => {
                if (bullet.bulletPos.x + bullet.bulletSize.w >= obs.obsPos.x &&
                    bullet.bulletPos.y + bullet.bulletSize.h >= obs.obsPos.y &&
                    bullet.bulletPos.x <= obs.obsPos.x + obs.obsSize.w &&
                    bullet.bulletPos.y <= obs.obsPos.y + obs.obsSize.h) {
                        obs.obsRemove = true;
                        bullet.bulletRemove = true;
                        this.counterScore++
                }
            })

            this.vegetas.forEach(vgt => {
                if (bullet.bulletPos.x + bullet.bulletSize.w >= vgt.vgtPos.x &&
                    bullet.bulletPos.y + bullet.bulletSize.h >= vgt.vgtPos.y &&
                    bullet.bulletPos.x <= vgt.vgtPos.x + vgt.vgtSize.w &&
                    bullet.bulletPos.y <= vgt.vgtPos.y + vgt.vgtSize.h) {
                        vgt.obsRemove = true;
                        bullet.bulletRemove = true;
                        this.counterScore += 3
                }
            })

            this.piccolos.forEach(pcl => {
                if (bullet.bulletPos.x + bullet.bulletSize.w >= pcl.pclPos.x &&
                    bullet.bulletPos.y + bullet.bulletSize.h >= pcl.pclPos.y &&
                    bullet.bulletPos.x <= pcl.pclPos.x + pcl.pclSize.w &&
                    bullet.bulletPos.y <= pcl.pclPos.y + pcl.pclSize.h) {
                        pcl.obsRemove = true;
                        bullet.bulletRemove = true;
                        this.counterScore += 2
                }
            })

            this.targetSound.play()
            this.destroyObs()
        })
    },


    // --- EXTRAS --- //

    generateExtra() {
        if (this.frames % 700 === 0) {
        this.extras.push(new BlueBob(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }
        if (this.frames % 600 === 0) {
        this.extras.push(new GreenBob(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }
        if (this.frames % 500 === 0) {
        this.extras.push(new RedBob(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }
        if (this.frames % 400 === 0) {
        this.extras.push(new YellowBob(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }
    },

    clearExtras() {
        this.extras = this.extras.filter(eachBob => (eachBob.bobPos.x >= 0 && eachBob.bobPos.x <= this.canvasSize.w))
    },


    // --- END GAME --- //

    gameOver() {
        this.bgSound.stop()
        this.endSound.play()
        clearInterval(this.interval)
        clearInterval(this.speedInterval)
        this.drawEndMessage()
        const reload = document.querySelector("#restart-button")
        reload.style.display = "block"
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
