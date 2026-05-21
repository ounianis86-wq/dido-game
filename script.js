let player = {
    x: 180,
    y: 300,
    size: 40,
    color: "red"
};

let coins = [];
let score = 0;

function startGame() {
    document.body.innerHTML = `
        <div style="text-align:center;">
            <h1>Dido Game 🎮</h1>
            <p id="score">النقاط: 0</p>

            <canvas id="gameCanvas"
                width="400"
                height="500"
                style="
                    background:#222;
                    border:4px solid black;
                    border-radius:15px;
                ">
            </canvas>
        </div>
    `;

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    document.addEventListener("keydown", movePlayer);

    setInterval(() => {
        createCoin();
        updateGame(ctx);
    }, 30);
}

function movePlayer(e) {
    if(e.key === "ArrowLeft") {
        player.x -= 20;
    }

    if(e.key === "ArrowRight") {
        player.x += 20;
    }

    if(player.x < 0) player.x = 0;
    if(player.x > 360) player.x = 360;
}

function createCoin() {
    if(Math.random() < 0.02) {
        coins.push({
            x: Math.random() * 360,
            y: 0,
            size: 20
        });
    }
}

function updateGame(ctx) {
    ctx.clearRect(0, 0, 400, 500);

    // اللاعب
    ctx.fillStyle = player.color;
    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );

    // العملات
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

        // التقاط العملة
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
        }
    }
}
