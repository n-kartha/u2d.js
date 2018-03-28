import GameObject from "./gameobject";

let Physics= {
    gravity: class Gravity{
        constructor(gameObject){
            if(gameObject instanceof GameObject){
                //gravity stuff
            }else{
                throw "gameObject param expects a GameObject"
            }
        }
    },
}
