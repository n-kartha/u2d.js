import BufferExecutor from './util/buffer-executor';
import GameObject from './gameobject/gameobject';
import Universe from './universe';
import Vector from './util/vector';

/**
 * @summary The Universe2D namespace for holding all objects exported by the library. Globally available.
 * @namespace
 */
export const U2D = {};

/**
 * @see Universe
 */
U2D.Universe = Universe;

/**
 * @see Vector
 */
U2D.Vector = Vector;

/**
 * You can access private variables in classes within `U2D` like this:
 * ```javascript
 * myVariable[U2D.priv].privateVariable
 * ```
 * 
 * For instance, you can access the private `objects` property of {@link Universe|`Universe`} like this:
 * ```javascript
 * let u = new U2D.Universe();
 * let objects = u[U2D.priv].objects;
 * ```
 * 
 * Private variables are marked with a preceding `private:`
 * 
 * @summary `U2D.priv`: `Symbol` to be used for private variables in classes.
 * @public
 */
U2D.priv = Symbol('Universe2D private symbol');

/**
 * @summary `U2D.dev`: Objects and classes for extending the library. You would probably not need to use this if you are not going in-depth.
 * @namespace
 */
U2D.dev = {};

/**
 * @see GameObject
 */
U2D.GameObject = GameObject;

/**
 * @summary `U2D.util`: Miscellaneous functions and classes that you can use for yourself. These are probably also used within functions inside the library.
 * @namespace
 */
U2D.util = {};

/**
 * @see BufferExecutor
 */
U2D.util.BufferExecutor = BufferExecutor;
