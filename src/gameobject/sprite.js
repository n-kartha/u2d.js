import errors from '../dev/errors';
import GameObject from './gameobject';
import Vector from '../util/vector';
import {
  priv
} from '../exports';

/**
 * Template for object to be passed as arguments to the `constructor` of `Sprite`. This is not actually a type. Create an object that follows this template to pass arguments to the `constructor` of `U2D.Sprite`.
 * @typedef SpriteSettings
 * @type {Object}
 * @property {Vector} dimensions Heigth and width of each sprite
 * @property {number} fps Delay (in `ms`) between switching between frames
 * @property {number} [padding=0] Padding between frames
 * @property {number} [startFrame=0] Frame to start at
 * @property {number} [endFrame] Frame to end at
 * @property {Vector} [startAt] Co-ordinates in spritesheet to start drawing at. This overrides `startFrame`
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

      // defaults (static image)
      let fDim = new Vector(sprite.width, sprite.height);
      let padding = 0;
      let fStart = 0;
      let fEnd = 0;
      let startAt = new Vector(0, 0);
      let fps = 0;
      let rows = 1;
      let cols = 1;
      let cache = [];

      /**
       * Frame (starting at `startFrame` and ending at `endFrame`) which is being drawn right now
       * 
       * @summary Current frame
       * @member {number} Sprite#private:currFrame
       */
      this[priv].currFrame = 0;

      /**
       * HTML5 Image drawn onto the canvas when the sprite is drawn. This is constructed using the `Image` constructor, like this:
       * 
       * ```javascript
       * let img = new Image();
       * ```
       * 
       * @summary HTML5 Image
       * @member {Image} Sprite#private:image
       */
      this[priv].image = sprite;

      /**
       * Spritesheet configuration associated with this sprite
       * 
       * @summary Spritesheet settings
       * @member {object} Sprite#private:spriteSettings
       * @default {}
       */
      this[priv].spriteSettings = spriteSettings || {};

      /**
       * Dimensions to which the sprite is resized each time it is drawn
       * 
       * @summary Resize dimensions
       * @member {Vector} Sprite#private:dim
       * @default Dimensions of {@link Sprite#private:image|this sprite's `Image`}
       */
      this[priv].dim = resizeDimensions || fDim;

      if (spriteSettings) {
        if (spritesettings.dimensions instanceof Vector &&
          typeof spriteSettings.fps === 'number') {

          fDim = spriteSettings.dimensions;
          fps = spriteSettings.fps;
          padding = spriteSettings.padding || 0;
          cols = Math.floor((sprite.width - padding) / (fDim.x + padding));
          rows = Math.floor((sprite.height - padding) / (fDim.y + padding));
          fStart = spriteSettings.startFrame || 0;
          fEnd = spriteSettings.endFrame || rows * cols - fStart;
          startAt = spriteSettings.starAt || startAt;

        } else {
          throw errors.invalidObject('spriteSettings', '{ dimensions, fps [, padding] [, startFrame] [, endFrame] }', spriteSettings);
        }
      }

      let row = -1;
      let col = 0;

      // cache all frames
      for (let frame = fStart; frame <= fEnd; frame++) {
        if (frame % rows === 0) {
          row++;
          col = 0;
        }

        this[priv].cache.push(
          new Vector(startAt.x + col * (fDim.x + padding) + padding, row * (fDim.y + padding) + padding)
        );
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
