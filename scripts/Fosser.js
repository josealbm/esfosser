class Fosser {
    posX;
    posY;
    direction;
    LEFT = document.getElementById("imgleft");
    RIGHT = document.getElementById("imgright");
    UP = document.getElementById("imgup");
    DOWN = document.getElementById("imgdown");
    //static lives = NUM_LIVES;
    isDead = false;

    constructor(posX, posY, direction, lives) {
        this.posX = posX;
        this.posY = posY;
        this.direction = direction;
        //Fosser.lives--;
        this.drawFosser(direction, posX, posY);

    }

    drawFosser(direction, posX, posY) {
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        ctx.drawImage(direction, posX, posY);
    }

    checkDead(x, y, zomx, zomy, MAP) {
        var posY = y / 50;
        var posX = x / 50;

        if (x === zomx && y === zomy && MAP[posY][posX] != 3) {
            let audio = new Audio("./audio/wilhelmscream.mp3");
            audio.volume = 0.05;
            audio.play();
            console.log("YOU DIE");
            this.isDead = true;
            //Fosser = new Fosser(fos_x, fos_y, LEFT);
            score -= 20;
            this.lives--;
        }
        if (MAP[posY][posX] === 2) {
            let audio = new Audio("./audio/wilhelmscream.mp3");
            audio.volume = 0.05;
            audio.play();
            this.isDead = true;
            console.log("YOU DIE");
            //Fosser = new Fosser(fos_x, fos_y, LEFT);
            score -= 40;
            this.lives--;
        }
    }

    digIn(MAP, x, y) {
        var posY = y / 50;
        var posX = x / 50;
        switch (this.direction) {
            case LEFT:
                if (isInXrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posY - SQUARE_SIDE, this.posX)) {
                    if (MAP[posY][posX - 1] === 0) {
                        MAP[posY][posX - 1] = 2;
                    } else if (MAP[posY][posX - 1] === 2) {
                        MAP[posY][posX - 1] = 0;
                    } else if (MAP[posY][posX - 1] === 4) {
                        MAP[posY][posX - 1] = 3;
                    }
                }
                break;

            case UP:
                if (isInYrange(this.posY, -SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY - SQUARE_SIDE)) {
                    if (MAP[posY - 1][posX] === 0) {
                        MAP[posY - 1][posX] = 2;
                    } else if (MAP[posY - 1][posX] === 2) {
                        MAP[posY - 1][posX] = 0;
                    } else if (MAP[posY - 1][posX] === 4) {
                        MAP[posY - 1][posX] = 3;
                    }
                }
                break;

            case RIGHT:
                if (isInXrange(this.posX, SQUARE_SIDE) && isWalkable(MAP, this.posX + SQUARE_SIDE, this.posY)) {
                    if (MAP[posY][posX + 1] === 0) {
                        MAP[posY][posX + 1] = 2;
                    } else if (MAP[posY][posX + 1] === 2) {
                        MAP[posY][posX + 1] = 0;
                    } else if (MAP[posY][posX + 1] === 4) {
                        MAP[posY][posX + 1] = 3;
                    }
                }
                break;

            case DOWN:
                if (isInYrange(this.posY, SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY + SQUARE_SIDE)) {
                    if (MAP[posY + 1][posX] === 0) {
                        MAP[posY + 1][posX] = 2;
                    } else if (MAP[posY + 1][posX] === 2) {
                        MAP[posY + 1][posX] = 0;
                    } else if (MAP[posY + 1][posX] === 4) {
                        MAP[posY + 1][posX] = 3;
                    }
                }
                break;

            default:
                console.log("Passa algo");
                break;
        }

    }



}