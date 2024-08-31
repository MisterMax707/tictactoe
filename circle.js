
const colorwhite = "#FFFFFF"
class circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        if (x == 10 && y == 10)
            this.id = 0;
        else if (x == 120 && y == 10)
            this.id = 1;
        else if (x == 230 && y == 10)
            this.id = 2;
        else if (x == 10 && y == 120)
            this.id = 3;
        else if (x == 120 && y == 120)
            this.id = 4;
        else if (x == 230 && y == 120)
            this.id = 5;
        else if (x == 10 && y == 230)
            this.id = 6;
        else if (x == 120 && y == 230)
            this.id = 7;
        else if (x == 230 && y == 230)
            this.id = 8;


    }
    getCrossPositionX() {
        return this.x;
    }
    getCrossPositionY() {
        return this.y;
    }
    draw() {

        CanvasContext.drawImage(circle_img, this.x, this.y, this.width, this.height)
    }
    delete() {
        CreateRect(this.x, this.y, this.width, this.height, colorwhite);

    }
}
