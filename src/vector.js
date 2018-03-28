export default class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    add(n){
        if(n instanceof Number){
            this.x += n;
            this.y += n;
        }else if(n instanceof Vector){
            this.x += n.x;
            this.y += n.y;
        }
    }

    static add(a, b){
        if(a instanceof Vector && b instanceof Vector){
            return new Vector(a.x + b.x, a.y + b.y);
        }
    }

    subtract(n){
        if(n instanceof Number){
            this.x -= n;
            this.y -= n;
        }else if(n instanceof Vector){
            this.x -= n.x;
            this.y -= n.y;
        }
    }

    static subtract(a, b){
        if(a instanceof Vector && b instanceof Vector){
            return new Vector(a.x - b.x, a.y - b.y);
        }
    }
}