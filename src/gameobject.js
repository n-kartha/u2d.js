import Vector from './vector';

export default class GameObject{
    constructor(pos){
        if(pos instanceof Vector){
            this.pos = pos;
        }else{
            throw "pos expects a vector";
        }
    }
}