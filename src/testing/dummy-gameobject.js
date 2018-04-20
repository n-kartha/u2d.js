import GameObject from '../gameobject/gameobject'
import Vector from '../util/vector';

class DummyGameObject extends GameObject {
  constructor() {
    super(new Vector(10, 10));
  }

  draw(ctx) {
    let coords = this.getCoords();
    ctx.fillRect(coords.x, coords.y, 10, 10);
  }

  liesLeftOf(x) {
    return;
  }
}
