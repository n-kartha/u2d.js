import GameObject from './gameobject';
import errors from '../dev/errors';

import {
  priv,
  Vector
} from './main';

/**
 * Object to be passed as arguments to the <code>constructor</code> of <code>Sprite</code>
 * @typedef SpriteSettings
 * @type {Object}
 * @property {Vector} dimensions Heigth and width of each sprite
 * @property {number} fps Delay (in <code>ms</code>) between switching between frames
 * @property {number} [padding=0] Padding between frames
 * @property {number} [startFrame=0] Frame to start at
 * @property {number} [endFrame] Frame to end at
 */

/**
 * Spritesheet-based <code>GameObject</code> that auto-updates with each frame
 */
class Sprite extends GameObject {
  /**
   * Create a new <code>Sprite</code> and return it
   * @param {Vector} pos Starting position
   * @param {Image} spritesheet HTML5 <code>Image</code> for the spritesheet
   * @param {SpriteSettings} spriteSettings Settings for <code>spritesheet</code>
   */
  constructor(pos, spritesheet, spriteSettings) {
    if (pos instanceof Vector && spritesheet instanceof Image) {
      super(pos);
      this[priv].image = spritesheet;

      if (spriteSettings) {
        if (spritesettings.dimensions instanceof Vector &&
          typeof spritesettings.fps === 'number') {

          this[priv].frameDim = spriteSettings.dimensions;
          this[priv].fps = spriteSettings.fps;

          let props = ['padding', 'startFrame', 'endFrame'];

          for (let prop of props) {
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

  update(frame, fps) {

  }
}
