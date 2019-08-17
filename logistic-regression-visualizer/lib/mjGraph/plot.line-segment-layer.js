/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import {PlotLayer} from './plot.layer.js';
import {ClipLineToSquare} from './utils.geometry.js'

export class LineSegmentLayer extends PlotLayer {

  #pImpl = null;
  #coefficients = [0, 0, 0, 0];

  constructor(coefficients) {
    super();

    if (Array.isArray(coefficients) && coefficients.length >= 3) {
      this.#coefficients[0] = coefficients[0];
      this.#coefficients[1] = coefficients[1];
      this.#coefficients[2] = coefficients[2];

      this.#coefficients[3] = coefficients.length >= 4 ? coefficients[3] : 0;
    }

  }

  attachToPlot(pImpl, x, y, w, h) {
    this.#pImpl = pImpl;
    super.attachToPlot(pImpl, x, y, w, h);
  }

  render(g, bounds) {
    const [x,y,w,h] = bounds;
    const {xMax, xMin, yMax, yMin} = this.#pImpl;
    const dx = xMax - xMin;
    const dy = yMax - yMin;

    const line = ClipLineToSquare(this.#coefficients, xMin, yMin, xMax, yMax);

    g.lineStyle(3);
    g.beginFill(0);
    g.drawPolygon([
      x + w/dx * (line[0] - xMin),
      y + h/dy * (dy - line[1] + yMin),
      x + w/dx * (line[2] - xMin),
      y + h/dy * (dy - line[3] + yMin)
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