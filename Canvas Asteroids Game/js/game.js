const gameApp = {
    name: 'Game app',
    description: 'Game app with Canvas',
    version: '1.0.0',
    license: undefined,
    authors: 'Patricia Muñoz de Dios y Manuel de la Barreda',
    canvas: undefined,
    ctx: undefined,
    FPS: 60,
    frames: 0,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    keys: {
        keyW: 87,
        keyA: 65,
        keyS: 83,
        keyD: 68,
        keySpace: 32,
    },
    background: undefined,
    player: undefined,
    obstacles: [],
    bullets: [],

    init(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.setDimensions();
        this.start();
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth;
        this.canvasSize.h = window.innerHeight;
        this.canvas.width = this.canvasSize.w;
        this.canvas.height = this.canvasSize.h;
    },

    start() {
        
    },

    reset() {

    },

    drawAll() {
        
    },

    clear() {
        
    },

    generateObstacle() {
        
    },

    clearObstacles() {
        
    },

    isCollision() {

    },

    gameOver() {

    },
};