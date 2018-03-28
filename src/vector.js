class Vector(){
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    add(n){
        if(n typeof Number){
            this.x += n;
            this.y += n;
        }else if(n typeof Vector){
            this.x += n.x;
            this.y += n.y;
        }
    }
}