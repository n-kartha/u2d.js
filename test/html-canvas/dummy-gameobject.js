const GameObject = U2D.dev.GameObject;
const {
  Vector,
  priv
} = U2D;

/**
 * Dummy GameObject used for testing
 * @private
 */
class DummyGameObject extends GameObject {
  constructor() {
    super(new Vector(10, 10));
  }

  draw(ctx) {
    let coords = this.getCoords();
    ctx.fillStyle = 'white';
    ctx.fillRect(coords.x, coords.y, 10, 10);
  }

  liesLeftOf(x) {
    return this.getCoords(performance.now() - this[priv].creation) + 10 < x;
  }

  liesRightOf(x) {
    return this.getCoords(performance.now() - this[priv].creation) > x;
  }

  liesAbove(y) {
    return this.getCoords(performance.now() - this[priv].creation) + 10 < y;
  }

  liesBelow(y) {
    return this.getCoords(performance.now() - this[priv].creation) > y;
  }
}

window.DummyGameObject = DummyGameObject;
