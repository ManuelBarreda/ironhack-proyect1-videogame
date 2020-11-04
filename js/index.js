window.onload = () => {

    gameApp.init('canvas')

    document.getElementById('start-button').onclick = () => {
        startGame();
    };
    document.getElementById("restart-button").onclick = () => {
        tryAgain();
    }

    function startGame() {
        document.getElementById('popmenu').style.display = 'none'
        gameApp.start();
    };

    function tryAgain() {
        const reloadButton = document.querySelector("#restart-button")
        reloadButton.style.display = "none"
        //window.reload()
        gameApp.start()
    }
}
