import GameObject from './gameobject';
import errorMessages from './errors';

import {
  private,
  Vector
} from './main';

/**
 * Properties for manipulating sprites
 * @typedef SpriteSettings
 * @type {Object}
 * @property {Vector} dimensions Heigth and width of each sprite
 * @property {number} fps Delay (in ms) between switching between frames
 * @property {number} [padding=0] Padding between frames
 * @property {number} [startFrame=0] Frame to start at
 * @property {number} [endFrame] Frame to end at
 */

/**
 * Spritesheet-based GameObject that auto-updates with each frame
 */
class Sprite extends GameObject {
  /**
   * Create a new Sprite and return it
   * @param {Vector} pos Starting position
   * @param {Image} spritesheet HTML5 Image for the spritesheet
   * @param {SpriteSettings} spriteSettings Settings for `spritesheet`
   */
  constructor(pos, spritesheet, spriteSettings) {
    if (pos instanceof Vector && spritesheet instanceof Image) {
      super(pos);
      this[private].image = spritesheet;

      if (spriteSettings) {
        if (spritesettings.dimensions instanceof Vector &&
          typeof spritesettings.fps === "number") {

          this[private].frameDim = spriteSettings.dimensions;
          this[private].fps = spriteSettings.fps;

          let props = ['padding', 'startFrame', 'endFrame'];

          for (let prop of props) {
            if (typeof spriteSettings[prop] === "number") {
              this[private][prop] = spriteSettings[prop];
            }
          }
        }
      }
    } else {
      throw errorMessages.invalidArguments(['Vector', 'Image', '[object]'], arguments);
    }
  }

  update(frame, fps) {

  }
}
