class Fosser {
    posX;
    posY;
    direction;
    LEFT = document.getElementById("imgleft");
    RIGHT = document.getElementById("imgright");
    UP = document.getElementById("imgup");
    DOWN = document.getElementById("imgdown");
    static lives;
    position;

    constructor(posX, posY, direction) {
        this.posX = posX;
        this.posY = posY;
        this.direction = direction;
        this.drawFosser(direction, posX, posY);
    }

    drawFosser(direction, posX, posY) {
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        ctx.drawImage(direction, posX, posY);
    }

    fosserPosition() {
        this.posX = posX;
        this.posY = posY;
        this.position = MAP[posY / 50][posX / 50];
    }

    checkDead(x, y, zomx, zomy) {
        var posY = y / 50;
        var posX = x / 50;

        if (x === zomx && y === zomy) {
            console.log("YOU DIE");
        }
        if (MAP[posY][posX] === 2) {
            console.log("YOU DIE");
        }
    }

    digIn(MAP, x, y) {
        var posY = y / 50;
        var posX = x / 50;
        switch (this.direction) {
            case LEFT:
                if (isInXrange(fos_x, -SQUARE_SIDE) && isWalkable(MAP, fos_x - SQUARE_SIDE, fos_y)) {
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
                if (isInYrange(fos_y, -SQUARE_SIDE) && isWalkable(MAP, fos_x, fos_y - SQUARE_SIDE)) {
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
                if (isInXrange(fos_x, SQUARE_SIDE) && isWalkable(MAP, fos_x + SQUARE_SIDE, fos_y)) {
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
                if (isInYrange(fos_y, SQUARE_SIDE) && isWalkable(MAP, fos_x, fos_y + SQUARE_SIDE)) {
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