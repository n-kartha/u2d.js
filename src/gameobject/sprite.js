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
 * Returns sprite values to be destructured and stored in variables
 * 
 * @param {Image} sprite
 * @param {SpriteSettings} spriteSetttings
 * @private
 */
function getSpriteValues(sprite, spriteSettings) {
  return {
    fDim: spriteSettings.dimensions || new Vector(sprite.width, sprite.height),

    padding: spriteSettings.padding || 0,

    rows: Math.floor((sprite.height - this.padding) / (this.fDim.y + this.padding)),
    cols: Math.floor((sprite.width - this.padding) / (this.fDim.x + this.padding)),

    fStart: spriteSettings.startFrame || 0,
    fEnd: this.rows * this.cols - 1,

    fps: spriteSettings.fps || 0,

    startAt: new Vector(0, 0)
  };
}

/**
 * Get cached frame starting positions
 * @param {Vector} fDim
 * @param {number} fStart
 * @param {number} fEnd
 * @param {Vector} startAt
 * @param {number} padding
 * @param {number} cols
 * @private
 */
function getCachedFrames(fDim, fStart, fEnd, startAt, padding, cols) {
  let row = -1;
  let col = 0;
  let cache = [];

  // cache all frames
  for (let frame = fStart; frame <= fEnd; frame++) {
    if (col % cols === 0) {
      row++;
      col = 0;
    }

    cache.push(
      new Vector(startAt.x + col * (fDim.x + padding) + padding, row * (fDim.y + padding) + padding)
    );

    col++;
  }

  return cache;
}

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
      let {
        fDim,
        fStart,
        fEnd,
        padding,
        fps,
        rows,
        cols,
        startAt
      } = getSpriteValues(sprite, spriteSettings);

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

      /**
       * Amount of time (in ms) after which the frame should be updated. This is used in the {@link Sprite#draw|draw function}.
       * 
       * @summary Time to wait before incrementing frame
       * @member Sprite#private:updateTime
       */
      this[priv].updateTime = 1000 / fps;

      /**
       * Array of starting points of frames in the spritesheet to draw the sprite from, cached for better performance per frame
       * 
       * @summary Cached frame starting positions
       * @member {Vector[]} Sprite#private:cache
       */
      this[priv].cache = getCachedFrames(fDim, fStart, fEnd, startAt, padding, cols);

      this[priv].prevUpdateFrame = performance.now();
    } else {
      throw errors.invalidArguments(['Vector', 'Image', '[object]'], arguments);
    }
  }

  /**
   * (Internal) Draws the sprite onto the canvas, updating the frame
   * 
   * @summary Draw and update self
   * @override
   */
  draw(ctx, time) {
    if ((time - this[priv].creation)) {
      this[priv].currFrame = (this[priv].currFrame + 1) % this[priv].cache.length;
    }
  }
}
