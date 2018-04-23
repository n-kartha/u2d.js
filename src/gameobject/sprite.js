import errors from '../dev/errors';
import GameObject from './gameobject';
import Vector from '../util/vector';
import {
  priv
} from '../main';

/**
 * Template for object to be passed as arguments to the `constructor` of `Sprite`. This is not actually a type. Create an object that follows this template to pass arguments to the `constructor` of `U2D.Sprite`.
 * @typedef SpriteSettings
 * @type {Object}
 * @property {Vector} dimensions Heigth and width of each sprite
 * @property {number} fps Delay (in `ms`) between switching between frames
 * @property {number} [padding=0] Padding between frames
 * @property {number} [startFrame=0] Frame to start at
 * @property {number} [endFrame] Frame to end at
 */

/**
 * `U2D.Sprite`: Spritesheet-based `GameObject` that auto-updates with each frame
 * 
 * @summary Image drawn onto the canvas
 * @extends GameObject
 */
class Sprite extends GameObject {
  /**
   * Creates a new `Sprite` and returns it
   * @param {Vector} pos Starting position for the sprite
   * @param {Vector} resizeDimensions Dimensions to resize to while drawing. Leave as `null` if you do not want it to be resized.
   * @param {Image} sprite HTML5 `Image` for the sprite or spritesheet. You can create the `Image` using the `new Image(path)` constructor. Make sure that you pass it only after it has loaded (`img.onload`).
   * @param {SpriteSettings} [spriteSettings] Settings for `sprite` if it is a spritesheet. Leave blank if it is just an image which you want to draw onto the canvas.
   */
  constructor(pos, resizeDimensions = null, sprite, spriteSettings) {
    if (pos instanceof Vector && sprite instanceof Image) {
      super(pos);
      this[priv].image = sprite;

      this[priv].dim = resizeDimensions || new Vector(sprite.width, sprite.height);

      if (spriteSettings) {
        if (spritesettings.dimensions instanceof Vector &&
          typeof spriteSettings.fps === 'number') {

          this[priv].frameDim = spriteSettings.dimensions;
          this[priv].fps = spriteSettings.fps;

          /**
           * Padding between each sprite in the spritesheet
           * 
           * @summary Sprite image padding
           * @member {number} Sprite#private:padding
           */

          /**
           * Frame in the spritesheet to start at
           * 
           * @summary Starting frame
           * @member {number} Sprite#private:startFrame
           */

          /**
           * Frame in the spritesheet to stop at
           * 
           * @summary Ending frame
           * @member {number} Sprite#private:endFrame
           */

          let props = ['padding', 'startFrame', 'endFrame'];

          for (let prop of Object.keys(props)) {
            if (typeof spriteSettings[prop] === 'number') {
              this[priv][prop] = spriteSettings[prop];
            }
          }
        }
      }
    } else {
      throw errors.invalidArguments(['Vector', 'Image', '[object]'], arguments);
    }
  }

  /**
   * Called automatically, so you should not call it yourself.
   * 
   * @summary Updates the sprite
   * @param {number} time Current timestamp in `ms`
   */
  update(time) {

  }
}
