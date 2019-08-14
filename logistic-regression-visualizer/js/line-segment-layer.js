/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import * as mjg from '../lib/mjGraph/mjGraph.js';
import {ClipLineToSquare} from './utils/geom-utils.js'

export class LineSegmentLayer extends mjg.PlotLayer {

  #coefficients = [0, 0, 0, 0];

  constructor() {
    super();
  }

  render(g, bounds) {
    const [x,y,w,h] = bounds;

    const line = ClipLineToSquare(this.#coefficients, 0, 0, w/h, 1);

    g.lineStyle(3);
    g.beginFill(0);
    g.drawPolygon([
      x + line[0]*h,
      y + (1-line[1])*h,
      x + line[2]*h,
      y + (1-line[3])*h
    ]);
    g.endFill();

  }

  setCoefficient(index, value) {
    if (index < 0 || index > this.#coefficients.length) {
      throw new Error('Invalid coefficient index');
    }

    if (isNaN(value)) {
      throw new Error('Coefficient value must be (or be coercable to) a number.');
    }

    this.#coefficients[index] = +value;
    this.repaint();
  }
}