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
}