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
import LoadTextFile from './utils/load-text-file.js';
import {NextPowerOf2} from './utils/geom-utils.js';

export class LRFieldLayer extends mjg.PlotLayer {

  #pImpl = null;

  #filter = null;
  #initialised = false;

  #coefficients = [0,0,0,0];

  constructor() {
    super();

    LoadTextFile('shaders/logistic-regression-map.txt').then((shaderSrc) => {

      this.#filter = new PIXI.Filter('', shaderSrc, {
        coefficients: [-10,10,10,0],
        adjust: [1,1],
        scale: [1,1],
        offset: [0,0]
      });
      //this.#filter.resolution = window.devicePixelRatio;

      this.repaint();

    })
    .catch((e) => {
      console.log(e);
    });
  }

  attachToPlot(pImpl, x, y, w, h) {
    this.#pImpl = pImpl;
    super.attachToPlot(pImpl, x, y, w, h);
  }

  render(g, bounds) {
    const [x,y,w,h] = bounds;
    const {xMax, xMin, yMax, yMin} = this.#pImpl;

    if (!this.#initialised && this.#filter !== null) {
      g.filters = [this.#filter];
      this.#initialised = true;
    }

    if (!this.#filter) {
      return;
    }

    this.#filter.uniforms.coefficients.set(this.#coefficients);
    this.#filter.uniforms.adjust.set([
      NextPowerOf2(w) / w,
      NextPowerOf2(h) / h
    ]);
    this.#filter.uniforms.scale.set([xMax - xMin, yMax - yMin]);
    this.#filter.uniforms.offset.set([xMin / (xMin - xMax), yMin / (yMin - yMax)]);

    g.beginFill(0);
    g.drawRect(x,y,w,h);
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

    if (this.#initialised) {
      this.repaint();
    }
  }

}