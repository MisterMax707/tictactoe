class cross {
    constructor(x, y) {
        this.x = x
        this.y = y
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

        CanvasContext.drawImage(cross_img, this.x, this.y, this.width, this.height)
    }
    delete() {
        CreateRect(this.x, this.y, this.width, this.height, colorwhite);
    }
}
class button {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 100;
        this.height = 100;
        this.enable = true;
    }
    attachCross(cross) {
        this.cross = cross;
    }
    attachCircle(circle) {
        this.circle = circle;
    }
    btnclear() {
        if (this.cross != null) {
            this.cross.delete();
            this.cross = null;

        }
        else if (this.circle != null) {
            this.circle.delete();
            this.circle = null;
        }
    }

}