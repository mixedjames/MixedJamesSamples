/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import LoadTextFile from './load-text-file.js';
import { ClipLineToUnitSquare, NextPowerOf2 } from './geom-utils.js'

export default class ProbabilityMapRenderer {

  #parent = null;
  #g = new PIXI.Graphics();
  #filter = null;

  #xMax;
  #yMax;

  constructor(parent, settings, pixi) {

    this.#parent = parent;
    this.#xMax = +settings.xMax;
    this.#yMax = +settings.yMax;

    pixi.stage.addChild(this.#g);

    LoadTextFile('shaders/logistic-regression-map.txt')
    .then((txt) => {
      this.#filter = new PIXI.Filter('', txt, {
        coefficients: [0,0,0,0], adjust: [1,1]
      });
      this.#g.filters = [this.#filter];

      this.#render();
      pixi.ticker.update(Date.now());
    })
    .catch((e) => {
      console.error(e);
    });

  }

/*
  setCoefficient(index, value) {
    this.#filter.uniforms.coefficients[index] = +value;
    requestAnimationFrame(() => { this.#render(); });
  }
*/

  #render = function() {
    const g = this.#g;

    const bounds = this.#parent.getPlotBounds();

    this.#filter.uniforms.coefficients[0] = this.#parent.coefficients[0];
    this.#filter.uniforms.coefficients[1] = this.#parent.coefficients[1];
    this.#filter.uniforms.coefficients[2] = this.#parent.coefficients[2];
    this.#filter.uniforms.coefficients[3] = this.#parent.coefficients[3];

    this.#filter.uniforms.adjust[0] =
      this.#xMax * NextPowerOf2(bounds[2]) / bounds[2];
    this.#filter.uniforms.adjust[1] =
      this.#yMax * NextPowerOf2(bounds[3]) / bounds[3];

    g.beginFill(0);
    g.drawRect(
      bounds[0], bounds[1],
      bounds[2], bounds[3]
    );
    g.endFill();

/*
    const line = ClipLineToUnitSquare(this.#filter.uniforms.coefficients);

    g.lineStyle(3);
    g.beginFill(0);
    g.drawPolygon([
      bounds[0] + line[0]*bounds[2],
      bounds[1] + (1-line[1])*bounds[3],
      bounds[0] + line[2]*bounds[2],
      bounds[1] + (1-line[3])*bounds[3]
    ]);
    g.endFill();
*/
  }

}