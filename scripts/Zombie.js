class Zombie {
    posX;
    posY;
    direction;
    isDead = false;
    isTrapped = false;
    timedOut = false;

    constructor(posX, posY, direction) {
        this.posX = posX;
        this.posY = posY;
        this.direction = direction;
        ctx.drawImage(direction, posX, posY);
    }

    automaticMove() {
        var choice = Math.floor(Math.random() * 4);
        if (!this.isTrapped) {
            switch (choice) {
                case 0:

                    if (isInYrange(this.posY, SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY + SQUARE_SIDE)) {
                        this.posY += SQUARE_SIDE;
                        this.direction = ZOM_DOWN;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInXrange(this.posX, SQUARE_SIDE) && isWalkable(MAP, this.posX + SQUARE_SIDE, this.posY)) {
                        this.posX += SQUARE_SIDE;
                        this.direction = ZOM_RIGHT
                            //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInYrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY - SQUARE_SIDE)) {
                        this.posY -= SQUARE_SIDE;
                        this.direction = ZOM_UP;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInXrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posX - SQUARE_SIDE, this.posY)) {
                        this.posX -= SQUARE_SIDE;
                        this.direction = ZOM_LEFT;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    }
                    this.checkTrapped(this.posX, this.posY);
                    break;

                case 1:
                    if (isInXrange(this.posX, SQUARE_SIDE) && isWalkable(MAP, this.posX + SQUARE_SIDE, this.posY)) {
                        this.posX += SQUARE_SIDE;
                        this.direction = ZOM_RIGHT
                            //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInYrange(this.posY, SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY + SQUARE_SIDE)) {
                        this.posY += SQUARE_SIDE;
                        this.direction = ZOM_DOWN;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInYrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY - SQUARE_SIDE)) {
                        this.posY -= SQUARE_SIDE;
                        this.direction = ZOM_UP;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInXrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posX - SQUARE_SIDE, this.posY)) {
                        this.posX -= SQUARE_SIDE;
                        this.direction = ZOM_LEFT;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    }
                    this.checkTrapped(this.posX, this.posY);
                    break;


                case 2:
                    if (isInYrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY - SQUARE_SIDE)) {
                        this.posY -= SQUARE_SIDE;
                        this.direction = ZOM_UP;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInXrange(this.posX, SQUARE_SIDE) && isWalkable(MAP, this.posX + SQUARE_SIDE, this.posY)) {
                        this.posX += SQUARE_SIDE;
                        this.direction = ZOM_RIGHT
                            //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInYrange(this.posY, SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY + SQUARE_SIDE)) {
                        this.posY += SQUARE_SIDE;
                        this.direction = ZOM_DOWN;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);

                    } else if (isInXrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posX - SQUARE_SIDE, this.posY)) {
                        this.posX -= SQUARE_SIDE;
                        this.direction = ZOM_LEFT;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    }
                    this.checkTrapped(this.posX, this.posY);
                    break;

                case 3:
                    if (isInXrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posX - SQUARE_SIDE, this.posY)) {
                        this.posX -= SQUARE_SIDE;
                        this.direction = ZOM_LEFT;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInYrange(this.posX, -SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY - SQUARE_SIDE)) {
                        this.posY -= SQUARE_SIDE;
                        this.direction = ZOM_UP;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInXrange(this.posX, SQUARE_SIDE) && isWalkable(MAP, this.posX + SQUARE_SIDE, this.posY)) {
                        this.posX += SQUARE_SIDE;
                        this.direction = ZOM_RIGHT
                            //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    } else if (isInYrange(this.posY, SQUARE_SIDE) && isWalkable(MAP, this.posX, this.posY + SQUARE_SIDE)) {
                        this.posY += SQUARE_SIDE;
                        this.direction = ZOM_DOWN;
                        //this.zombiePosition(this.posX, this.posY);
                        this.drawZombie(this.direction, this.posX, this.posY);
                    }
                    this.checkTrapped(this.posX, this.posY);
                    break;

                default:
                    alert("Alguna cosa no va bé, revisa-ho");
                    break;
            }

        } else {
            if (!this.timedOut) {
                this.timedOut = true;
                setTimeout(this.zombieTrapped, 5000, this.posX, this.posY);
            }
        }
    }

    drawZombie(direction, posX, posY) {
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        ctx.drawImage(direction, posX, posY);
    }


    checkTrapped(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        if (MAP[posY / 50][posX / 50] === 2) {
            this.isTrapped = true;
            let audio = new Audio("./audio/zombiefalls.mp3");
            audio.volume = 0.1;
            audio.play();
            MAP[posY / 50][posX / 50] = 4;
            score += 10;
        }

    }

    checkDead(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        if (MAP[posY / 50][posX / 50] === 3 && this.isTrapped) {
            this.isDead = true;
            score += 50;

        }
    }

    zombieTrapped(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        if (this.isTrapped) {
            console.log("han pasado 5 segundos");
            this.isTrapped = false;
            MAP[posY / 50][posX / 50] = 0;
            this.timedOut = false;

        }
    }
}