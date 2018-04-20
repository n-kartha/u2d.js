const {
  readFileSync
} = require('fs');

const {
  runInThisContext
} = require('vm');

runInThisContext(readFileSync('u2d.min.js'));

const Vector = U2D.Vector;

QUnit.test('builds', (assert) => {
  assert.ok(typeof U2D === 'object');
});

QUnit.test('vector-constructor', (assert) => {
  let a = new Vector(5, 6);
  assert.equal(a.x, 5, 'x');
  assert.equal(a.y, 6, 'y');
});

QUnit.test('vector-equals', (assert) => {
  let a = new Vector(10, 10);
  let b = new Vector(10, 10);
  assert.ok(a.equals(b), 'instance');

  assert.ok(Vector.equals(a, b), 'static');
});

QUnit.test('vector-add', (assert) => {
  let a = new Vector(10, 10);
  let b = new Vector(10, 10);

  a.add(b);

  assert.ok(a.equals(new Vector(20, 20)), 'instance');

  assert.ok(Vector.add(a, b)
    .equals(new Vector(30, 30)), 'static');
});

QUnit.test('vector-neg', (assert) => {
  let a = new Vector(10, 10);
  assert.ok(a.neg()
    .equals(new Vector(-10, -10)), 'instance');
});
