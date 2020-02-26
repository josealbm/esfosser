/* Maps */

const MAP1 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const MAP2 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const LEFT = document.getElementById("imgleft");
const RIGHT = document.getElementById("imgright");
const UP = document.getElementById("imgup");
const DOWN = document.getElementById("imgdown");

const ZOM_LEFT = document.getElementById("zombieleft");
const ZOM_RIGHT = document.getElementById("zombieright");
const ZOM_UP = document.getElementById("zombieup");
const ZOM_DOWN = document.getElementById("zombiedown");

const GRAVE = document.getElementById("tombstone");
const Z_TRAPPED = document.getElementById("trapped");

var lives = 3;
const Z_DELAY = 15000; //Retard entre les sortides dels zombies
const SQUARE_SIDE = 50; //Mida del costat d’ una casella
const NUM_SQUARES = 8;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var fos_x = 350;
var fos_y = 350;

var zom_x = 0;
var zom_y = 0;

var MAP;

var player;
var score = 0;

function setMap() {
    var mapa = document.getElementsByTagName("select")[0].value;
    switch (mapa) {
        case "Mapa 1":
            MAP = MAP1;
            break;

        case "Mapa 2":
            MAP = MAP2;
            break;
    }
}

function paintMap(array) {

    for (i = 0; i < NUM_SQUARES; i++) {
        for (j = 0; j < NUM_SQUARES; j++) {
            var posY = SQUARE_SIDE * j;
            var posX = SQUARE_SIDE * i;

            ctx.beginPath();
            ctx.rect(posY, posX, SQUARE_SIDE, SQUARE_SIDE);
            if (array[i][j] == 1) {
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.stroke();
            } else if (array[i][j] == 2) {
                ctx.beginPath();
                ctx.arc(posY + 25, posX + 25, 20, 0, 2 * Math.PI);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.stroke();

            } else if (array[i][j] == 3) {
                ctx.drawImage(GRAVE, posY, posX);
            } else if (array[i][j] == 4) {
                ctx.drawImage(Z_TRAPPED, posY, posX);
            }
            // ctx.stroke();
        }

    }

}

function isInXrange(position, SQUARE_SIDE) {
    if ((position + SQUARE_SIDE >= 0) && (position <= canvas.width - SQUARE_SIDE))
        return true;
    else
        return false;
}
// returns true if param is in range [0..599]
function isInYrange(position, SQUARE_SIDE) {
    if ((position + SQUARE_SIDE >= 0) && (position <= canvas.height - SQUARE_SIDE))
        return true;
    else
        return false;
}

function isWalkable(array, x, y) {
    if (x >= 0) {
        var posX = x / 50;
    } else {
        return false;
    }
    if (y >= 0) {
        var posY = y / 50;
    } else {
        return false;
    }

    if (array[posY][posX] === 0 || array[posY][posX] === 2 || array[posY][posX] === 3 || array[posY][posX] === 4) {
        return true;
    } else {
        return false;
    }

}

function move(e) {

    switch (e.keyCode) {

        case 65:
        case 37:
            if (isInXrange(Fosser.posX, -SQUARE_SIDE) && isWalkable(MAP, Fosser.posX - SQUARE_SIDE, Fosser.posY)) {
                Fosser.posX -= SQUARE_SIDE;
            }
            Fosser.direction = LEFT;
            break;

        case 87:
        case 38:
            if (isInYrange(Fosser.posY, -SQUARE_SIDE) && isWalkable(MAP, Fosser.posX, Fosser.posY - SQUARE_SIDE)) {
                Fosser.posY -= SQUARE_SIDE;
            }
            Fosser.direction = UP;
            break;

        case 68:
        case 39:
            if (isInXrange(Fosser.posX, SQUARE_SIDE) && isWalkable(MAP, Fosser.posX + SQUARE_SIDE, Fosser.posY)) {
                Fosser.posX += SQUARE_SIDE;

            }
            Fosser.direction = RIGHT;
            break;

        case 88:
        case 40:
            if (isInYrange(Fosser.posY, SQUARE_SIDE) && isWalkable(MAP, Fosser.posX, Fosser.posY + SQUARE_SIDE)) {
                Fosser.posY += SQUARE_SIDE;
            }
            Fosser.direction = DOWN;
            break;

        case 83:
        case 32:
            Fosser.digIn(MAP, Fosser.posX, Fosser.posY);
            let audio = new Audio("./audio/dig.mp3");
            audio.volume = 0.1;
            audio.play();
            break;

        default:
            console.log("Aquesta tecla no fa res");
            break;
    }
}







function startGame() {
    // Afegim el moviment
    window.onkeydown = move;
    canvas.addEventListener('keydown', move, true);
    // Escollim el mapa
    setMap();
    document.getElementById("submit").blur();
    // Feim el canvas visible
    document.getElementById("myCanvas").style.display = "flex";
    // Pintam
    paintMap(MAP);
    player = document.getElementById("player").value;
    document.getElementById("player-name").innerHTML = "Jugador: " + player;

    document.getElementById("score").innerHTML = "Puntuació: " + score;

    document.getElementById("lives").innerHTML = "Vides: " + Fosser.lives;

    // Audio en començar el joc
    let audio = new Audio("./audio/cranberries-zombie.mp3");
    audio.volume = 0.02;
    audio.play();

    var zombies = [];
    var numzom = 0;

    Fosser = new Fosser(fos_x, fos_y, LEFT);
    zombies[numzom] = new Zombie(zom_x, zom_y, ZOM_RIGHT);

    // Interval de creació de zombies

    setInterval(function() {
        numzom++;
        zombies[numzom] = new Zombie(zom_x, zom_y, ZOM_RIGHT);
    }, Z_DELAY);

    // interval de funcionament del joc
    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("score").innerHTML = "Puntuació: " + score;
        document.getElementById("lives").innerHTML = "Vides: " + lives;

        paintMap(MAP);
        // Si el fosser no està mort i té vides
        if (!Fosser.isDead && lives >= 0) {
            Fosser.drawFosser(Fosser.direction, Fosser.posX, Fosser.posY);
        } else {
            // Si te vides, reviure
            if (lives >= 0) {
                Fosser.drawFosser(LEFT, fos_x, fos_y);
                Fosser.isDead = false;
                lives--;
            } else {
                //Si no, has perdut.
                alert("Game Over");
            }
        }
        for (let i = 0; i < zombies.length; i++) {
            zombies[i].automaticMove(zombies[i].posX, zombies[i].posY, SQUARE_SIDE);
            Fosser.checkDead(Fosser.posX, Fosser.posY, zombies[i].posX, zombies[i].posY, MAP);
            zombies[i].checkDead(zombies[i].posX, zombies[i].posY);
        }
    }, 500);
}