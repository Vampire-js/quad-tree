import { c } from "../main";

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(context) {
        c.beginPath();
        c.fillStyle = "#1f4287";
        c.arc(this.x, this.y, .5, 0, 2 * Math.PI);
        c.fill();
        c.stroke();
    }
    update(context) {
        this.draw();
        this.x += Math.random() * 20
        this.y += Math.random() * 20
    }
}

export class Boundary {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    contains(point) {
        return (
            point.x > this.x - this.w &&
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y < this.y + this.h
        );
    }
    draw(context) {
        c.shadowColor = "green";
        c.shadowBlur = 30;
        
        c.beginPath();
        c.strokeStyle = "#21e6c1";
        
        c.rect(this.x - this.w, this.y - this.h, this.w * 2, this.h * 2);
        c.lineWidth = 1.3
        c.stroke();
    }
}

export class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    subdivide() {
        let { x, y, w, h } = this.boundary;

        let nw = new Boundary(x - w / 2, y - h / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, this.capacity);

        let ne = new Boundary(x + w / 2, y - h / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, this.capacity);

        let sw = new Boundary(x - w / 2, y + h / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, this.capacity);

        let se = new Boundary(x + w / 2, y + h / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, this.capacity);

        this.divided = true;
    }
    insert(point) {
        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        return (
            this.northwest.insert(point) ||
            this.northeast.insert(point) ||
            this.southwest.insert(point) ||
            this.southeast.insert(point)
        );
    }
    display(context) {
        this.boundary.draw(context);

        for (let point of this.points) {
            point.draw(context);
        }

        if (this.divided) {
            this.northwest.display(context);
            this.northeast.display(context);
            this.southwest.display(context);
            this.southeast.display(context);
        }
    }
}
