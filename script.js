let score = 0;

function startGame() {
    document.body.innerHTML = `
        <div style="text-align:center;padding-top:40px;font-family:Arial;">
            <h1>Dido Game 🎮</h1>
            <p id="score">النقاط: 0</p>

            <button onclick="addPoint()" 
            style="
                padding:20px 40px;
                font-size:22px;
                border:none;
                border-radius:15px;
                background:black;
                color:white;
                cursor:pointer;
            ">
                اضغط هنا
            </button>
        </div>
    `;
}

function addPoint() {
    score++;

    document.getElementById("score").innerText =
        "النقاط: " + score;

    if(score >= 10) {
        alert("لقد ربحت! 🎉");
    }
}
