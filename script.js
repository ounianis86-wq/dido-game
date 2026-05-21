let player = {
    x: 180,
    y: 420,
    size: 40,
    color: "red"
};

let coins = [];
let score = 0;
let ctx;

function startGame() {

    document.body.innerHTML = `
        <div style="
            text-align:center;
            font-family:Arial;
            color:white;
        ">

            <h1>Dido Game 🎮</h1>

            <p id="score">النقاط: 0</p>

            <canvas 
                id="gameCanvas"
                width="400"
                height="500"
                style="
                    background:#222;
                    border:4px solid white;
                    border-radius:15px;
                ">
            </canvas>

            <br><br>

            <button onclick="moveLeft()" style="
                padding:15px 25px;
                font-size:25px;
                margin-right:20px;
            ">
                ⬅️
            </button>

            <button onclick="moveRight()" style="
                padding:15px 25px;
                font-size:25px;
            ">
                ➡️
            </button>

        </div>
    `;

    const canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    setInterval(gameLoop, 30);
}

function gameLoop() {

    ctx.clearRect(0, 0, 400, 500);

    drawPlayer();

    createCoin();

    drawCoins();

    checkCollision();
}

function drawPlayer() {

    ctx.fillStyle = player.color;

    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );
}

function moveLeft() {

    player.x -= 25;

    if(player.x < 0) {
        player.x = 0;
    }
}

function moveRight() {

    player.x += 25;

    if(player.x > 360) {
        player.x = 360;
    }
}

function createCoin() {

    if(Math.random() < 0.03) {

        coins.push({
            x: Math.random() * 380,
            y: 0,
            size: 20
        });
    }
}

function drawCoins() {

    ctx.fillStyle = "gold";

    for(let i = 0; i < coins.length; i++) {

        let coin = coins[i];

        coin.y += 4;

        ctx.beginPath();

        ctx.arc(
            coin.x,
            coin.y,
            coin.size / 2,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

function checkCollision() {

    for(let i = 0; i < coins.length; i++) {

        let coin = coins[i];

        if(
            coin.x > player.x &&
            coin.x < player.x + player.size &&
            coin.y > player.y &&
            coin.y < player.y + player.size
        ) {

            coins.splice(i, 1);

            score++;

            document.getElementById("score").innerText =
                "النقاط: " + score;

            if(score >= 10) {

                alert("لقد ربحت 🎉");
            }
        }
    }
}
