/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

export default class ScatterPlotRenderer {

  #parent;
  #g = new PIXI.Graphics();

  #points;
  #xMax;
  #yMax;

  constructor(parent, settings, pixi) {

    this.#parent = parent;
    this.#points = settings.points || [];

    this.#xMax = +settings.xMax;
    this.#yMax = +settings.yMax;

    pixi.stage.addChild(this.#g);
    this.#render();

  }

  #render = function() {
    const g = this.#g;
    const points = this.#points;
    const plotArea = this.#parent.getPlotBounds();

    g.clear();

    g.lineStyle(1, 0xFFFFFF);
    for (let i = 0; i < points.result.length; ++ i) {
      let x = plotArea[0] + (points.a[i] * plotArea[2])/this.#xMax;
      let y = plotArea[1] + ((1 - points.b[i]/this.#yMax) * plotArea[3]);

      if (points.result[i]) {
        g.drawCircle(x, y, 4);
      }
      else {
        g.drawRect(x-4, y-4, 8, 8);
      }
    }
    g.endFill();

  }
}