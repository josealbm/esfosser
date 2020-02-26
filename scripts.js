/* Maps */

const MAP = [
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

const NUM_LIVES = 3;
const Z_DELAY = 10000; //Retard entre les sortides dels zombies
const SQUARE_SIDE = 50; //Mida del costat d’ una casella
const NUM_SQUARES = 8;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var fos_x = 350;
var fos_y = 350;

var zom_x = 0;
var zom_y = 0;

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
    if ((position + SQUARE_SIDE >= 0) && (position < canvas.width - SQUARE_SIDE))
        return true;
    else
        return false;
}
// returns true if param is in range [0..599]
function isInYrange(position, SQUARE_SIDE) {
    if ((position + SQUARE_SIDE >= 0) && (position < canvas.height - SQUARE_SIDE))
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

    if (array[posY][posX] === 0 || array[posY][posX] === 2 || array[posY][posX] === 3) {
        return true;
    } else {
        return false;
    }

}

function move(e) {

    switch (e.keyCode) {

        case 65:
        case 37:
            if (isInXrange(fos_x, -SQUARE_SIDE) && isWalkable(MAP, fos_x - SQUARE_SIDE, fos_y)) {
                fos_x -= SQUARE_SIDE;
            }
            Fosser.direction = LEFT;
            break;

        case 87:
        case 38:
            if (isInYrange(fos_y, -SQUARE_SIDE) && isWalkable(MAP, fos_x, fos_y - SQUARE_SIDE)) {
                fos_y -= SQUARE_SIDE;
            }
            Fosser.direction = UP;
            break;

        case 68:
        case 39:
            if (isInXrange(fos_x, SQUARE_SIDE) && isWalkable(MAP, fos_x + SQUARE_SIDE, fos_y)) {
                fos_x += SQUARE_SIDE;

            }
            Fosser.direction = RIGHT;
            break;

        case 88:
        case 40:
            if (isInYrange(fos_y, SQUARE_SIDE) && isWalkable(MAP, fos_x, fos_y + SQUARE_SIDE)) {
                fos_y += SQUARE_SIDE;
            }
            Fosser.direction = DOWN;
            break;

        case 83:
        case 32:
            Fosser.digIn(MAP, fos_x, fos_y);
            break;

        default:
            console.log("Aquesta tecla no fa res");
            break;
    }
}





window.onkeydown = move;
window.onload = function() {
    paintMap(MAP);
    canvas.addEventListener('keydown', move, true);
    var zombies = [];
    var numzom = 0;
    Fosser = new Fosser(fos_x, fos_y, LEFT);
    zombies[numzom] = new Zombie(zom_x, zom_y, ZOM_RIGHT);
    setInterval(function() {
        numzom++;
        zombies[numzom] = new Zombie(zom_x, zom_y, ZOM_RIGHT);
    }, Z_DELAY);


    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paintMap(MAP);
        Fosser.drawFosser(Fosser.direction, fos_x, fos_y);
        for (let i = 0; i < zombies.length; i++) {
            zombies[i].automaticMove(this.posX, this.posY, SQUARE_SIDE);
            Fosser.checkDead(fos_x, fos_y, zombies[i].posX, zombies[i].posY);

        }

    }, 500);
}