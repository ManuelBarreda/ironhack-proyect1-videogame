window.onload = () => {
    document.getElementById('button').onclick = () => {
        startGame();
    };

    function startGame() {
        gameApp.init('canvas')
        gameApp.drawAll()
    };
};