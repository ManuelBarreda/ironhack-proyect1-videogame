window.onload = () => {
    // WANT TO ADD BACKGROUND HERE

    gameApp.init('canvas')

    document.getElementById('start-button').onclick = () => {
        startGame();
    };

    function startGame() {
        document.getElementById('popmenu').style.display = 'none'
        gameApp.start();
        //document.getElementById('score').style.display = 'block'
    };
}